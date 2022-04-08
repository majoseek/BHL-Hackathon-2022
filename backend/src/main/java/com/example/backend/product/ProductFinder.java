package com.example.backend.product;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static com.example.backend.availableProduct.QAvailableProduct.availableProduct;
import static com.example.backend.product.QProduct.product;
import static com.example.backend.shop.QShop.shop;

@Service
public class ProductFinder {
    @PersistenceContext
    private EntityManager entityManager;


    List<ProductDTO> getProducts() {
        List<ProductDTO> products = new JPAQuery<>(entityManager)
                .from(product)
                .select(Projections.constructor(ProductDTO.class, product.id, product.name, product.EANCode, product.manufacturer, product.grammage))
                .fetch();

        products.forEach(product -> {
            List<StockInfo> stockAvailability = new JPAQuery<>(entityManager).from(availableProduct)
                    .join(availableProduct.shop, shop)
                    .join(availableProduct.product, QProduct.product)
                    .where(availableProduct.product.id.eq(product.getId()))
                    .select(Projections.constructor(StockInfo.class, shop.id, shop.name, shop.longitude, shop.latitude, availableProduct.priceInGr, availableProduct.quantity))
                    .fetch();
            product.setStockAvailability(stockAvailability);
        });
        return products;
    }

}
