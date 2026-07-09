package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // Count users by role
    long countByRole(User.Role role);

    // Count users created after a specific date
    long countByCreatedAtAfter(LocalDateTime date);

    // Count users created between two dates
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // Count users by role created after a specific date
    long countByRoleAndCreatedAtAfter(User.Role role, LocalDateTime date);

    // Count users by role created between two dates
    long countByRoleAndCreatedAtBetween(User.Role role, LocalDateTime start, LocalDateTime end);
}