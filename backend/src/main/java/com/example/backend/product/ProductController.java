package com.example.backend.product;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductFinder productFinder;

    public ProductController(ProductFinder productFinder) {
        this.productFinder = productFinder;
    }

    @GetMapping
    List<ProductDTO> getProducts() {
        return productFinder.getProducts();
    }

}
