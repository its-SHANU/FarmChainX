// RatingController.java
package com.farmchainx.farmchainx.controller;

import com.farmchainx.farmchainx.model.Rating;
import com.farmchainx.farmchainx.model.User;
import com.farmchainx.farmchainx.repository.UserRepository;
import com.farmchainx.farmchainx.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class RatingController {

    private final RatingService ratingService;
    private final UserRepository userRepository;

    public RatingController(RatingService ratingService, UserRepository userRepository) {
        this.ratingService = ratingService;
        this.userRepository = userRepository;
    }

    /**
     * Helper: resolves the authenticated User entity from the SecurityContext.
     * Spring stores UserDetails (not the custom User entity) in the context,
     * so we look up the user by email from the database.
     */
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authenticated user found");
        }
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found: " + email));
    }

    // Add rating to a product
    @PostMapping("/{productId}/ratings")
    public ResponseEntity<?> addRating(
            @PathVariable Long productId,
            @RequestBody Rating rating) {

        try {
            // FIX: Correctly resolve the User entity from SecurityContext instead of
            // using @AuthenticationPrincipal which would inject UserDetails, not User
            User currentUser = getCurrentUser();
            Rating savedRating = ratingService.addRating(productId, rating, currentUser);
            return ResponseEntity.ok(savedRating);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add rating: " + e.getMessage());
        }
    }

    // Get all ratings for a product
    @GetMapping("/{productId}/ratings")
    public ResponseEntity<List<Rating>> getProductRatings(@PathVariable Long productId) {
        try {
            List<Rating> ratings = ratingService.getRatingsByProductId(productId);
            return ResponseEntity.ok(ratings);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Get all ratings (for admin)
    @GetMapping("/ratings")
    public ResponseEntity<List<Rating>> getAllRatings() {
        try {
            List<Rating> ratings = ratingService.getAllRatings();
            return ResponseEntity.ok(ratings);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Delete a rating
    @DeleteMapping("/ratings/{ratingId}")
    public ResponseEntity<?> deleteRating(@PathVariable Long ratingId) {
        try {
            ratingService.deleteRating(ratingId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete rating");
        }
    }
}