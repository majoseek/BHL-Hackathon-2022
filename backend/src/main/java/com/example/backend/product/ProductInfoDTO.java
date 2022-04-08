package com.example.backend.product;

import java.util.List;

public class ProductInfoDTO {
    private final Long id;
    private final String name;
    private final String EANCode;
    private final String manufacturer;
    private final String grammage;

    private List<StockInfo> stockAvailability;

    //[class java.lang.Long, class java.lang.String, class java.lang.String, class java.lang.String, class java.lang.String
    public ProductInfoDTO(Long id, String name, String eanCode, String manufacturer, String grammage) {
        this.id = id;
        this.name = name;
        EANCode = eanCode;
        this.manufacturer = manufacturer;
        this.grammage = grammage;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEANCode() {
        return EANCode;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public String getGrammage() {
        return grammage;
    }

    public List<StockInfo> getStockAvailability() {
        return stockAvailability;
    }

    public void setStockAvailability(List<StockInfo> stockAvailability) {
        this.stockAvailability = stockAvailability;
    }
}
