package com.example.backend.product;

import com.example.backend.shop.ShopInfoDTO;

import java.util.Set;

public class ProductStockInfoDTO {
    private final ShopInfoDTO shopInfoDTO;
    private final double distance;
    private final Set<ProductInfoDTO> availableProducts;

    public ProductStockInfoDTO(ShopInfoDTO shopInfoDTO, double distance, Set<ProductInfoDTO> availableProducts) {
        this.shopInfoDTO = shopInfoDTO;
        this.distance = distance;
        this.availableProducts = availableProducts;
    }

    public ShopInfoDTO getShopInfoDTO() {
        return shopInfoDTO;
    }

    public double getDistance() {
        return distance;
    }

    public Set<ProductInfoDTO> getAvailableProducts() {
        return availableProducts;
    }
}
