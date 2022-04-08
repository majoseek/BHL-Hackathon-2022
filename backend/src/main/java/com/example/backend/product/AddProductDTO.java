package com.example.backend.product;

import java.util.Collections;
import java.util.List;

public class AddProductDTO {
    private String name;
    private String manufacturer;
    private String EANCode;
    private String grammage;
    private String imgURL;

    private List<Long> tagsIds = Collections.emptyList();

    public AddProductDTO() {
    }

    public AddProductDTO(String name, String manufacturer, String EANCode, String grammage, List<Long> tagsIds) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.EANCode = EANCode;
        this.grammage = grammage;
        this.tagsIds = tagsIds;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getEANCode() {
        return EANCode;
    }

    public void setEANCode(String EANCode) {
        this.EANCode = EANCode;
    }

    public String getGrammage() {
        return grammage;
    }

    public void setGrammage(String grammage) {
        this.grammage = grammage;
    }

    public List<Long> getTagsIds() {
        return tagsIds;
    }

    public void setTagsIds(List<Long> tagsIds) {
        this.tagsIds = tagsIds;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

}