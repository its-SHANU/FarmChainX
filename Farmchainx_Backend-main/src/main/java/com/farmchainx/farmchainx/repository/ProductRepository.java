package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.Product;
import com.farmchainx.farmchainx.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, Long> {
    // Find all products belonging to a specific farmer
    List<Product> findByFarmer(User farmer);
}