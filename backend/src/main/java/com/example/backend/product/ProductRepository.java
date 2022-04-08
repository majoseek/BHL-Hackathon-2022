package com.example.backend.product;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
//    Optional<Product> findById(Long id);
//    Optional<Product> findByEANCode(String eanCode);
//    List<Product> findByTags(Collection<Tag> tags);
//    List<Product> findByName(String name);
//    List<Product> findByManufacturer(String manufacturer);
}