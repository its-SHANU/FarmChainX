// PurchaseRepository.java
package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.Purchase;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends MongoRepository<Purchase, Long> {
    // Additional query methods if needed
}