package com.example.backend.shop;

public class AssignProductDTO {
    private Long productId;
    private Integer price;
    private Long quantity;

    public AssignProductDTO() {
    }

    public AssignProductDTO(Long productId, Integer price, Long quantity) {
       this.productId = productId;
        this.price = price;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
