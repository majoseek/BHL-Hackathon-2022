package com.example.backend.shop;

import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static com.example.backend.shop.QShop.shop;
import static com.querydsl.core.types.Projections.constructor;

@Component
public class ShopFinder {
    @PersistenceContext
    private EntityManager entityManager;


    public ShopInfoDTO getShopInfoById(Long id) {
        return new JPAQuery<>(entityManager).from(shop)
                .where(shop.id.eq(id))
                .select(constructor(ShopInfoDTO.class, shop.id, shop.name, shop.latitude, shop.longitude))
                .fetchFirst();
    }


}
