// ActivityRepository.java
package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, Long> {
    List<Activity> findTop10ByOrderByCreatedAtDesc();
}