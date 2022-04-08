package com.example.backend.product;

import com.example.backend.tag.Tag;
import com.example.backend.tag.TagRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    List<ProductDTO> getProducts() {
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

}
