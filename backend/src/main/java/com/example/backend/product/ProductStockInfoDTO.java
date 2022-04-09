package com.example.backend.product;

import com.example.backend.shop.ShopInfoDTO;

import java.util.Set;

public class ProductStockInfoDTO {
    private final ShopInfoDTO shopInfoDTO;
    private final double distance;
    private final Set<StockInfo> availableProducts;
    private final Double optimalParamValue;
    private final Integer unavailableProducts;

    public ProductStockInfoDTO(ShopInfoDTO shopInfoDTO, double distance, Set<StockInfo> availableProducts, Double optimalParamValue, Integer unavailableProducts) {
        this.shopInfoDTO = shopInfoDTO;
        this.distance = Math.round(distance * 100.0) / 100.0;
        this.availableProducts = availableProducts;
        this.optimalParamValue = optimalParamValue;
        this.unavailableProducts = unavailableProducts;
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

    public Integer getUnavailableProducts() {
        return unavailableProducts;
    }
}
