package com.example.backend.shop;

import com.example.backend.availableProduct.AvailableProduct;
import com.example.backend.availableProduct.AvailableProductRepository;
import com.example.backend.product.Product;
import com.example.backend.product.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> assignProductToShop(@PathVariable Long id, AssignProductDTO assignProductDTO) {
        try {
            Shop shop = shopRepository.getById(assignProductDTO.getShopId());
            Optional<Product> product = productRepository.findById(assignProductDTO.getProductId());
            if (product.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            AvailableProduct availableProduct = new AvailableProduct();
            availableProduct.setProduct(product.get());
            availableProduct.setShop(shop);
            availableProduct.setQuantity(assignProductDTO.getQuantity());
            availableProduct.setPriceInGr(assignProductDTO.getPrice());
            availableProductRepository.save(availableProduct);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Temporal solution
            return ResponseEntity.badRequest().build();
        }
    }
}
