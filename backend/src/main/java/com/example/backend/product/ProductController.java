package com.example.backend.product;

import com.example.backend.tag.Tag;
import com.example.backend.tag.TagRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductFinder productFinder;
    private final TagRepository tagRepository;
    private final ProductRepository productRepository;
    private final RecipeParser recipeParser;

    public ProductController(ProductFinder productFinder, TagRepository tagRepository, ProductRepository productRepository, RecipeParser recipeParser) {
        this.productFinder = productFinder;
        this.tagRepository = tagRepository;
        this.productRepository = productRepository;
        this.recipeParser = recipeParser;
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
            product.setImgURL(addProductDTO.getImgURL());
            productRepository.save(product);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/stockInfo")
    List<ProductStockInfoDTO> getAvailableStockInfo(@RequestParam Set<Long> productIds, @RequestParam Double userLatitude, @RequestParam Double userLongitude, @RequestParam Double QCoefficient) {
        return productFinder.getStockAvailibity(productIds, userLatitude, userLongitude, QCoefficient);
    }

    @GetMapping
    List<ProductInfoDTO> getProductsByTag(@RequestParam Optional<String> tag, @RequestParam Optional<String> name) {
        return productFinder.getProductsByNameOrTag(name, tag);
    }


    // Controller to upload file to server
    @PostMapping(value = "/byRecipe")
    public ResponseEntity<?> uploadFile(HttpServletRequest request, @RequestPart MultipartFile file) throws IOException {
        try {
            return ResponseEntity.ok(recipeParser.getProductsByFile(file));
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
