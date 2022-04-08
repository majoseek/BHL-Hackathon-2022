package com.example.backend.shop;

public class AssignProductDTO {
    private Long productId;
    private Long shopId;
    private Integer price;
    private Long quantity;

    public AssignProductDTO() {
    }

    public AssignProductDTO(Long productId, Long shopId, Integer price, Long quantity) {
        this.productId = productId;
        this.shopId = shopId;
        this.price = price;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}
