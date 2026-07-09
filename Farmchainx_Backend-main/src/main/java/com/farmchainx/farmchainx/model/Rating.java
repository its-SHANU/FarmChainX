package com.farmchainx.farmchainx.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "ratings")
public class Rating {
    @Id
    private Long id;

    private Integer stars;
    private String comment;
    private LocalDateTime createdAt = LocalDateTime.now();

    // Relationships
    @DBRef(lazy = true)
    private Product product;

    @DBRef(lazy = true)
    private User user;
}