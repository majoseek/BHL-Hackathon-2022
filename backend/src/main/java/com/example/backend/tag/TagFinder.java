package com.example.backend.tag;

import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static com.example.backend.product.QProduct.product;
import static com.example.backend.tag.QTag.tag;

@Component
public class TagFinder {
    @PersistenceContext
    private EntityManager entityManager;

    public List<String> getTagsByProductId(Long productId) {
        return new JPAQuery<>(entityManager).from(tag)
                .join(tag.products, product)
                .where(product.id.eq(productId))
                .select(tag.name)
                .fetch();
    }

    public List<String> getTagsAlike(List<String> tagsLookALike) {
         return new JPAQuery<>(entityManager).from(tag)
                 .where(tag.name.in(tagsLookALike))
                 .select(tag.name)
                 .fetch();
    }
}
