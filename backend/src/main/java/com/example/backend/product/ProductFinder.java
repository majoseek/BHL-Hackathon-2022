package com.example.backend.product;

import com.example.backend.shop.DistanceService;
import com.example.backend.shop.ShopFinder;
import com.example.backend.shop.ShopInfoDTO;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.example.backend.availableProduct.QAvailableProduct.availableProduct;
import static com.example.backend.product.QProduct.product;
import static com.example.backend.shop.QShop.shop;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.set;
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
                .select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage))
                .fetchFirst();
    }

    List<ProductInfoDTO> getProducts() {
        List<ProductInfoDTO> products = new JPAQuery<>(entityManager)
                .from(product)
                .select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage))
                .fetch();

        products.forEach(product -> {
            List<StockInfo> stockAvailability = new JPAQuery<>(entityManager).from(availableProduct)
                    .join(availableProduct.shop, shop)
                    .join(availableProduct.product, QProduct.product)
                    .where(availableProduct.product.id.eq(product.getId()))
                    .select(constructor(StockInfo.class, shop.id, shop.name, shop.longitude, shop.latitude, availableProduct.priceInGr, availableProduct.quantity))
                    .fetch();
            product.setStockAvailability(stockAvailability);
        });
        return products;
    }

    List<ProductStockInfoDTO> getStockAvailibity(Set<Long> productIds, Double userLatitude, Double userLongtitude) {
        return getProductStockInfo(productIds, userLatitude, userLongtitude);
    }

    private List<ProductStockInfoDTO> getProductStockInfo(Set<Long> productIds, Double userLatitude, Double userLongtitude) {
        Map<Long, Set<ProductInfoDTO>> shopsWithProducts = getShopsWithProducts(productIds);
        List<ProductStockInfoDTO> productStockInfoDTOS = new LinkedList<>();

        shopsWithProducts.forEach((shopId, productInfoDTOS) -> {
            ShopInfoDTO shopInfo = shopFinder.getShopInfoById(shopId);
            double distanceInMeters = DistanceService.getDistance(userLatitude, userLongtitude, shopInfo.latitude(), shopInfo.longitude());
            if (distanceInMeters < MAX_DISTANCE) {
                productStockInfoDTOS.add(new ProductStockInfoDTO(shopInfo, distanceInMeters, productInfoDTOS));
            }
        });
        return productStockInfoDTOS;
    }

    private Map<Long, Set<ProductInfoDTO>> getShopsWithProducts(Set<Long> productsIds) {
        return new JPAQuery<>(entityManager).from(availableProduct)
                .join(availableProduct.shop, shop)
                .join(availableProduct.product, product)
                .where(availableProduct.id.in(productsIds))
                .transform(groupBy(shop.id).as(set(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage))));
    }


}
