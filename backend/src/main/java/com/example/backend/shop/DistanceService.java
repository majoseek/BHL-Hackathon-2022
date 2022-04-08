package com.example.backend.shop;

public class DistanceService {
    public static double getDistance(double latFrom, double lonFrom, double latTo, double lonTo) {
        lonFrom = Math.toRadians(lonFrom);
        lonTo = Math.toRadians(lonTo);
        latFrom = Math.toRadians(latFrom);
        latTo = Math.toRadians(latTo);

        double dlon = lonTo - lonFrom;
        double dlat = latTo - latFrom;
        double a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(latFrom) * Math.cos(latTo)
                * Math.pow(Math.sin(dlon / 2), 2);

        double c = 2 * Math.asin(Math.sqrt(a));
        double r = 6371000;
        return (c * r);
    }
}
