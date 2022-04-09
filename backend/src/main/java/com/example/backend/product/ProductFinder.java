package com.example.backend.product;

import com.example.backend.math.ParamsInputData;
import com.example.backend.math.ShopScoreGenerator;
import com.example.backend.shop.DistanceService;
import com.example.backend.shop.ShopFinder;
import com.example.backend.shop.ShopInfoDTO;
import com.example.backend.tag.TagFinder;
import com.querydsl.core.group.GroupBy;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

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
    private final TagFinder tagFinder;

    public ProductFinder(ShopFinder shopFinder, TagFinder tagFinder) {
        this.shopFinder = shopFinder;
        this.tagFinder = tagFinder;
    }

    ProductInfoDTO getProductInfoById(Long id) {
        return new JPAQuery<>(entityManager).from(product).where(product.id.in(id)).select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL)).fetchFirst();
    }

    List<ProductInfoDTO> getProducts() {
        return new JPAQuery<>(entityManager).from(product).leftJoin(product.availableProducts, availableProduct).select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue())).groupBy(product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL).fetch();
    }

    List<ProductStockInfoDTO> getStockAvailibity(Set<Long> productIds, Double userLatitude, Double userLongtitude, Double QEfficient) {
        return getProductStockInfo(productIds, userLatitude, userLongtitude, QEfficient);
    }

    private Map<Long, Set<StockInfo>> getShopsWithProducts(Set<Long> productsIds) {
        return new JPAQuery<>(entityManager).from(availableProduct).join(availableProduct.shop, shop).join(availableProduct.product, product).where(product.id.in(productsIds)).groupBy(shop.id, shop.name, shop.longitude, product.id, product.EANCode, product.grammage, product.name, product.manufacturer, product.imgURL, shop.latitude, availableProduct.priceInGr, availableProduct.quantity).transform(groupBy(shop.id).as(GroupBy.set(constructor(StockInfo.class, constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue()), availableProduct.priceInGr, availableProduct.quantity))));
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
                productStockInfoDTOS.add(new ProductStockInfoDTO(shopInfo, distanceInMeters, stockInfos, ShopScoreGenerator.generateScore(distanceInMeters, missingProducts, productsInfos, QCoefficient), missingProducts));
            }
        });
        return productStockInfoDTOS;
    }


    List<ProductInfoDTO> getProductsByTag(String providedTag) {
        return new JPAQuery<>(entityManager).from(product).join(product.tags, tag).leftJoin(product.availableProducts, availableProduct).select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue())).groupBy(product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL).fetch();
    }

    List<ProductInfoDTO> getProductsByName(String providedName) {
        return new JPAQuery<>(entityManager).from(product).where(product.name.like("%" + providedName + "%")).leftJoin(product.availableProducts, availableProduct).select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue())).groupBy(product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL).fetch();
    }

    List<ProductInfoDTO> getProductsByNames(List<String> providedNames) {
        return new JPAQuery<>(entityManager).from(product).where(product.name.in(providedNames)).leftJoin(product.availableProducts, availableProduct).select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue())).groupBy(product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL).fetch();
    }

    //Get products by list of tags
    List<ProductInfoDTO> getProductsByTags(List<String> providedTags) {
        return new JPAQuery<>(entityManager).from(product).join(product.tags, tag).where(tag.name.in(providedTags)).leftJoin(product.availableProducts, availableProduct).select(constructor(ProductInfoDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL, availableProduct.priceInGr.avg().intValue())).groupBy(product.id, product.name, product.EANCode, product.manufacturer, product.grammage, product.imgURL).fetch();
    }


    public List<ProductInfoDTO> getProductsByNameOrTag(Optional<String> name, Optional<String> tag) {

        List<ProductInfoDTO> productsByName;
        if (name.isEmpty()) {
            productsByName = getProducts();
        } else {
            productsByName = getProductsByName(name.get());
        }

        List<ProductInfoDTO> productsByTag;
        if (tag.isEmpty()) {
            productsByTag = getProducts();
        } else {
            productsByTag = getProductsByTag(tag.get());

        }
        List<ProductInfoDTO> products = productsByName.stream()
                .distinct()
                .filter(productsByTag::contains).toList();

        products.forEach(it -> {
            it.setTags(tagFinder.getTagsByProductId(it.getId()));
        });

        return products;


    }
}
