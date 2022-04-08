package com.example.backend.product;

import com.example.backend.availableProduct.AvailableProduct;
import com.example.backend.tag.Tag;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Product")
public class Product {
    @Id
    private Long id;
    private String name;
    private String manufacturer;
    private String EANCode;
    private String grammage;

    @OneToMany(mappedBy = "product")
    private List<AvailableProduct> availableProducts;

    @ManyToMany
    private List<Tag> tags;


    public Product() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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


    @JoinTable(name = "product_tags", joinColumns = @JoinColumn(name = "products_id"), inverseJoinColumns = @JoinColumn(name = "tags_id"))
    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @JoinTable(name = "available_product", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "shop_id"))
    public List<AvailableProduct> getAvailableProducts() {
        return availableProducts;
    }

    public void setAvailableProducts(List<AvailableProduct> availableProducts) {
        this.availableProducts = availableProducts;
    }

}
