package com.example.backend.product;

import com.example.backend.math.ParamsInputData;
import com.example.backend.math.ShopScoreGenerator;
import com.example.backend.shop.DistanceService;
import com.example.backend.shop.ShopFinder;
import com.example.backend.shop.ShopInfoDTO;
import com.querydsl.core.group.GroupBy;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.backend.availableProduct.QAvailableProduct.availableProduct;
import static com.example.backend.product.QProduct.product;
import static com.example.backend.shop.QShop.shop;
import static com.example.backend.tag.QTag.tag;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.types.Projections.constructor;


@Service
public class ProductFinder {
    private final Double MAX_DISTANCE = 50 * 1000D;

    @PersistenceContext
    private EntityManager entityManager;

    private final ShopFinder shopFinder;

    public ProductFinder(ShopFinder shopFinder) {
        this.shopFinder = shopFinder;
    }

    ProductInfoDTO getProductInfoById(Long id) {
        return new JPAQuery<>(entityManager)
                .from(product)
                .where(product.id.in(id))
                .select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL))
                .fetchFirst();
    }

    List<ProductInfoDTO> getProducts() {
//        products.forEach(product -> {
//            List<StockInfo> stockAvailability = new JPAQuery<>(entityManager).from(availableProduct)
//                    .join(availableProduct.shop, shop)
//                    .join(availableProduct.product, QProduct.product)
//                    .where(availableProduct.product.id.eq(product.getId()))
//                    .select(constructor(StockInfo.class, shop.id, shop.name, shop.longitude, shop.latitude, availableProduct.priceInGr, availableProduct.quantity))
//                    .fetch();
//            product.setStockAvailability(stockAvailability);
//        });
        return new JPAQuery<>(entityManager)
                .from(product)
                .leftJoin(product.availableProducts, availableProduct)
                .select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue()))
                .groupBy(product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL)
                .fetch();
    }

    List<ProductStockInfoDTO> getStockAvailibity(Set<Long> productIds, Double userLatitude, Double userLongtitude, Double QEfficient) {
        return getProductStockInfo(productIds, userLatitude, userLongtitude, QEfficient);
    }

    private Map<Long, Set<StockInfo>> getShopsWithProducts(Set<Long> productsIds) {
        return new JPAQuery<>(entityManager).from(availableProduct)
                .join(availableProduct.shop, shop)
                .join(availableProduct.product, product)
                .where(availableProduct.id.in(productsIds))
                .groupBy(shop.id, shop.name, shop.longitude, product.id, product.EANCode, product.grammage, product.name, product.manufacturer, product.imgURL, shop.latitude, availableProduct.priceInGr, availableProduct.quantity)
                .transform(groupBy(shop.id).as(GroupBy.set(constructor(StockInfo.class, constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue()),  availableProduct.priceInGr, availableProduct.quantity))));
    }

    private List<ProductStockInfoDTO> getProductStockInfo(Set<Long> productIds, Double userLatitude, Double userLongtitude, Double QCoefficient) {
        Map<Long, Set<StockInfo>> shopsWithProducts = getShopsWithProducts(productIds);
        List<ProductStockInfoDTO> productStockInfoDTOS = new LinkedList<>();

        shopsWithProducts.forEach((shopId, stockInfos) -> {
            ShopInfoDTO shopInfo = shopFinder.getShopInfoById(shopId);
            double distanceInMeters = DistanceService.getDistance(userLatitude, userLongtitude, shopInfo.latitude(), shopInfo.longitude());
            if (distanceInMeters < MAX_DISTANCE) {
                List<ParamsInputData> productsInfos = stockInfos.stream().map((it) -> new ParamsInputData(it.price(), it.productInfoDTO().getAveragePrice(), it.quantity())).toList();
                Integer missingProducts = productIds.size() - stockInfos.size();
                productStockInfoDTOS.add(new ProductStockInfoDTO(shopInfo, distanceInMeters, stockInfos, ShopScoreGenerator.generateScore(distanceInMeters, missingProducts, productsInfos, QCoefficient)));

            }
        });
        return productStockInfoDTOS;
    }



    List<ProductInfoDTO> getProductsByTag(String providedTag) {
        return new JPAQuery<>(entityManager).from(product)
                .join(product.tags, tag)
                .leftJoin(product.availableProducts, availableProduct)
                .select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue()))
                .groupBy(product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL)
                .fetch();
    }

    List<ProductInfoDTO> getProductsByName(String providedName) {
        return new JPAQuery<>(entityManager).from(product)
                .where(product.name.like("%" + providedName + "%"))
                .leftJoin(product.availableProducts, availableProduct)
                .select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue()))
                .groupBy(product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL)
                .fetch();
    }

}
