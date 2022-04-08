package com.example.backend.availableProduct;

import com.example.backend.product.Product;
import com.example.backend.shop.Shop;

import javax.persistence.*;

@Entity
public class AvailableProduct {

    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(table="available_product", name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(table="available_product", name = "shop_id", referencedColumnName = "id")
    private Shop shop;

    private Integer priceInGr;

    private Long quantity;


    public AvailableProduct() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getPriceInGr() {
        return priceInGr;
    }

    public void setPriceInGr(Integer priceInGr) {
        this.priceInGr = priceInGr;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

}
