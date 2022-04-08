package com.example.backend.shop;

import com.example.backend.availableProduct.AvailableProduct;
import com.example.backend.availableProduct.AvailableProductRepository;
import com.example.backend.product.Product;
import com.example.backend.product.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/shop")
public class ShopController {
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final AvailableProductRepository availableProductRepository;

    public ShopController(ShopRepository shopRepository, ProductRepository productRepository, AvailableProductRepository availableProductRepository) {
        this.shopRepository = shopRepository;
        this.productRepository = productRepository;
        this.availableProductRepository = availableProductRepository;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> assignProductToShop(@PathVariable Long id, @RequestParam Long productId, @RequestParam Long quantity, @RequestParam Integer priceInGr) {
        try {
            Shop shop = shopRepository.getById(id);
            Optional<Product> product = productRepository.findById(productId);
            if (product.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            AvailableProduct availableProduct = new AvailableProduct();
            availableProduct.setProduct(product.get());
            availableProduct.setShop(shop);
            availableProduct.setQuantity(quantity);
            availableProduct.setPriceInGr(priceInGr);
            availableProductRepository.save(availableProduct);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Temporal solution
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/")
    public ResponseEntity<?> assignProductsToShop(@PathVariable Long id, List<AssignProductDTO> assignProductDTOS) {
        try {
            Shop shop = shopRepository.getById(id);
            List <AvailableProduct> productsToAssign = assignProductDTOS.stream().map((it) -> {
                Optional<Product> product = productRepository.findById(it.getProductId());
                return product.map(value -> new AvailableProduct(value, shop, it.getPrice(), it.getQuantity())).orElse(null);
            }).filter(Objects::nonNull).toList();
            availableProductRepository.saveAll(productsToAssign);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
