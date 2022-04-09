package com.example.backend.math;

public class ParamsInputData {
    private final Integer price;
    private final Integer avgPrice;

    public Integer getPrice() {
        return price;
    }


    public Integer getAvgPrice() {
        return avgPrice;
    }

    public ParamsInputData(Integer price, Integer avgPrice, Long quantity) {
        this.price = price;
        this.avgPrice = avgPrice;
    }
}
