package com.farmchainx.farmchainx.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private Long id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String password;

    @JsonProperty("role")
    private Role role;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Role {
        FARMER, CUSTOMER, RETAILER, ADMIN
    }
}