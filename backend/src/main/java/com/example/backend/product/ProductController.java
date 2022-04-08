package com.example.backend.product;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductFinder productFinder;

    public ProductController(ProductFinder productFinder) {
        this.productFinder = productFinder;
    }

    @GetMapping
    List<ProductInfoDTO> getProducts() {
        return productFinder.getProducts();
    }

    @GetMapping("/stockInfo")
    List<ProductStockInfoDTO> getAvailableStockInfo(@RequestParam Set<Long> productIds,
                                                    @RequestParam Double userLatitude,
                                                    @RequestParam Double userLongitude) {
        return productFinder.getStockAvailibity(productIds, userLatitude, userLongitude);
    }

}
