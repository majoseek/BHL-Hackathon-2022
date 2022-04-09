package com.example.backend.math;

import java.util.List;

public class ShopScoreGenerator {
    private static final int HUMAN_SPEED = 100; // 100 m/min
    private static final double PRICE_WEIGHT = 0.1;
    private static final double TIME_WEIGHT = 3;
    private static final int BASE = 10;
    private static final double AVAILABILITY_WEIGHT = 15;
    private static final double ROAD_COEFFICIENT = 1.4;


    private static Double computeAvailabilityScore(Integer missingProducts, Integer totalProducts) {
        return (1D + missingProducts) / totalProducts;
    }

    private static Double computePriceScore(List<ParamsInputData> pricesInfos) {
        Double sum = 0D;
        for (ParamsInputData priceInfo : pricesInfos) {
            if (priceInfo.getPrice() == null) {
                sum += priceInfo.getAvgPrice();
            } else {
                sum += priceInfo.getPrice();
            }
        }
        return sum;
    }

    private static Double computeTimeScore(Double distance) {
        return (distance * ROAD_COEFFICIENT) / HUMAN_SPEED; // Returns time in minutes
    }


    public static Double generateScore(Double distance, Integer missingProducts, List<ParamsInputData> productsInfos, Double QCoefficient) {
        double availabilityScore = computeAvailabilityScore(missingProducts, productsInfos.size()) * AVAILABILITY_WEIGHT;
        Double priceScore = (Math.pow(BASE, QCoefficient) - 1) * computePriceScore(productsInfos) * PRICE_WEIGHT;
        Double timeScore = (Math.pow(BASE, 1 - QCoefficient) - 1) * computeTimeScore(distance) * TIME_WEIGHT;
        return availabilityScore * (priceScore + timeScore);
    }
}
