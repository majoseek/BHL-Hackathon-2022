package com.example.backend.tag;

import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static com.example.backend.tag.QTag.tag;

@Component
public class TagFinder {
    @PersistenceContext
    private EntityManager entityManager;


    public List<String> getTagsAlike(List<String> tagsLookALike) {
         return new JPAQuery<>(entityManager).from(tag)
                 .where(tag.name.in(tagsLookALike))
                 .select(tag.name)
                 .fetch();
    }
}
