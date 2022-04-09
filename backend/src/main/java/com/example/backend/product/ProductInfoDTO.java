package com.example.backend.product;

import java.util.List;
import java.util.Objects;

public class ProductInfoDTO {
    private final Long id;
    private final String name;
    private final String EANCode;
    private final String manufacturer;
    private final String grammage;
    private final String imgURL;
    private final Integer averagePrice;
    private List<String> tags;

    //[class java.lang.Long, class java.lang.String, class java.lang.String, class java.lang.String, class java.lang.String
    public ProductInfoDTO(Long id, String name, String eanCode, String manufacturer, String grammage, String imgURL, Integer averagePrice) {
        this.id = id;
        this.name = name;
        this.EANCode = eanCode;
        this.manufacturer = manufacturer;
        this.grammage = grammage;
        this.imgURL = imgURL;
        this.averagePrice = averagePrice;
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

    public String getImgURL() {
        return imgURL;
    }

    public Integer getAveragePrice() {
        return averagePrice;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductInfoDTO that = (ProductInfoDTO) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
