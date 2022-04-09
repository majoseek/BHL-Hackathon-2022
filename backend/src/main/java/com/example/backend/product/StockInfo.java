package com.example.backend.product;

public record StockInfo(ProductInfoDTO productInfoDTO, Integer price, Long quantity) {
}
