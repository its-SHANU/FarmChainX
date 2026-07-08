package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.Product;
import com.farmchainx.farmchainx.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find all products belonging to a specific farmer
    List<Product> findByFarmer(User farmer);
}