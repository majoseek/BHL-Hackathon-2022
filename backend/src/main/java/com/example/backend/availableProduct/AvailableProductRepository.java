package com.example.backend.availableProduct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailableProductRepository extends JpaRepository<AvailableProduct, Long> {

}
