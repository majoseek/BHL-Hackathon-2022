package com.example.backend.shop;


import com.example.backend.AvailableProduct;
import com.example.backend.product.Product;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
public class Shop {
    @Id
    private Long id;
    private String name;
    private Double longitude;
    private Double latitude;

    @OneToMany(mappedBy = "shop")
    private List<AvailableProduct> products;

    public Shop() {
    }

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

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    @JoinTable(name = "available_product", joinColumns = @JoinColumn(name = "shop_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    public List<AvailableProduct> getProducts() {
        return products;
    }

    public void setProducts(List<AvailableProduct> products) {
        this.products = products;
    }

}

