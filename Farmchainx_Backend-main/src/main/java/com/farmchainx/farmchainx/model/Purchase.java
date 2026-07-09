package com.farmchainx.farmchainx.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "purchases")
public class Purchase {
    @Id
    private Long id;

    private Integer quantity;
    private Double totalAmount;
    private LocalDateTime createdAt = LocalDateTime.now();

    // Relationships
    @DBRef(lazy = true)
    private Product product;

    @DBRef(lazy = true)
    private User user;

    // Constructors
    public Purchase() {}

    public Purchase(Integer quantity, Double totalAmount, Product product, User user) {
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.product = product;
        this.user = user;
    }
}