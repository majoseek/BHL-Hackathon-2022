package com.example.backend.product;


import com.example.backend.tag.Tag;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository {
    Optional<Product> findById(Long id);
    Optional<Product> findByEANCode(String eanCode);
    List<Product> findByTags(Collection<Tag> tags);
    List<Product> findByNameLike(String name);
    List<Product> findByManufacturer(String manufacturer);
}

