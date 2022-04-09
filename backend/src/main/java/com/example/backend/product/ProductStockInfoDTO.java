package com.example.backend.product;

import com.example.backend.shop.ShopInfoDTO;

import java.util.Set;

public class ProductStockInfoDTO {
    private final ShopInfoDTO shopInfoDTO;
    private final double distance;
    private final Set<StockInfo> availableProducts;
    private final Double optimalParamValue;

    public ProductStockInfoDTO(ShopInfoDTO shopInfoDTO, double distance, Set<StockInfo> availableProducts, Double optimalParamValue) {
        this.shopInfoDTO = shopInfoDTO;
        this.distance = distance;
        this.availableProducts = availableProducts;
        this.optimalParamValue = optimalParamValue;
    }

    public ShopInfoDTO getShopInfoDTO() {
        return shopInfoDTO;
    }

    public double getDistance() {
        return distance;
    }


    public Set<StockInfo> getAvailableProducts() {
        return availableProducts;
    }

    public Double getOptimalParamValue() {
        return optimalParamValue;
    }
}
