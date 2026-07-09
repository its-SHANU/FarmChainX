package com.farmchainx.farmchainx.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    private Long id;

    private String name;
    private String cropType;
    private String soilType;
    private String pesticides;
    private LocalDate harvestDate;
    private LocalDate useBeforeDate;
    private String location;
    private String additionalInfo;
    private Double price;
    private Integer quantity;
    private Double averageRating;
    private String imageUrl;
    private LocalDateTime createdAt = LocalDateTime.now();

    // Relationships
    @DBRef(lazy = true)
    private User farmer;
}