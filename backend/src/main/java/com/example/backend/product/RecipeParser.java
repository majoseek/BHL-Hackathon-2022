package com.example.backend.product;

import com.example.backend.tag.TagFinder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

@Component
public class RecipeParser {

    private final ProductFinder productFinder;
    private final TagFinder tagFinder;

    public RecipeParser(ProductFinder productFinder, TagFinder tagFinder) {
        this.productFinder = productFinder;
        this.tagFinder = tagFinder;
    }

    private List<String> splitProductsAndQuantity(String recipe) {
        return recipe.lines().map(line -> line.split("-", 2)[0].trim()).toList();
    }

    private List<ProductInfoDTO> getAppropriateProducts(List<String> products) {
        List<ProductInfoDTO> productInfoDTOS = productFinder.getProductsByNames(products);
        if (!productInfoDTOS.isEmpty()) return productInfoDTOS;
        List<String> tags = tagFinder.getTagsAlike(products);
        return productFinder.getProductsByTags(tags);
    }


    List<ProductInfoDTO> getProductsByFile(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        List<ProductInfoDTO> productInfoDTOS = new java.util.ArrayList<>(Collections.emptyList());
        new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                .lines()
                .forEach((it) -> {
                    productInfoDTOS.addAll(getAppropriateProducts(splitProductsAndQuantity(it)));
                });
        productInfoDTOS.forEach(it -> it.setTags(tagFinder.getTagsByProductId(it.getId())));
        return productInfoDTOS;
    }


}
