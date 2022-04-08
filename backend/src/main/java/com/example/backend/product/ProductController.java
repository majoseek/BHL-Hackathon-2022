package com.example.backend.product;

import com.example.backend.tag.Tag;
import com.example.backend.tag.TagRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductFinder productFinder;
    private final TagRepository tagRepository;
    private final ProductRepository productRepository;

    public ProductController(ProductFinder productFinder, TagRepository tagRepository, ProductRepository productRepository) {
        this.productFinder = productFinder;
        this.tagRepository = tagRepository;
        this.productRepository = productRepository;
    }

    @GetMapping
    List<ProductInfoDTO> getProducts() {
        return productFinder.getProducts();
    }

    @PostMapping
    ResponseEntity<?> createProduct(@RequestBody AddProductDTO addProductDTO) {
        try {
            List<Tag> tags = tagRepository.getAllByIdIn(addProductDTO.getTagsIds());
            Product product = new Product();
            product.setName(addProductDTO.getName());
            product.setTags(tags);
            product.setEANCode(addProductDTO.getEANCode());
            product.setGrammage(addProductDTO.getGrammage());
            product.setManufacturer(addProductDTO.getManufacturer());
            productRepository.save(product);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/stockInfo")
    List<ProductStockInfoDTO> getAvailableStockInfo(@RequestParam Set<Long> productIds,
                                                    @RequestParam Double userLatitude, @RequestParam Double userLongitude) {
        return productFinder.getStockAvailibity(productIds, userLatitude, userLongitude);
    }

    @GetMapping
    List<ProductInfoDTO> getProductsByTag(@RequestParam Optional<String> tag, @RequestParam Optional<String> name) {
        if (name.isPresent()) return productFinder.getProductsByName(name.get());
        if (tag.isPresent()) return productFinder.getProductsByTag(tag.get());
        return productFinder.getProducts();
    }

}
