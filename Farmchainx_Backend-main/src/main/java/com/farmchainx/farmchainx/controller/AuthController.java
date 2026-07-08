package com.farmchainx.farmchainx.controller;

import com.farmchainx.farmchainx.config.JwtUtil;
import com.farmchainx.farmchainx.model.User;
import com.farmchainx.farmchainx.repository.UserRepository;
import com.farmchainx.farmchainx.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @Value("${admin.registration.key}")
    private String adminRegistrationKey;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder,
                          AuthService authService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            logger.info("Registration attempt for email: {}", request.get("email"));

            String name = request.get("name");
            String email = request.get("email");
            String password = request.get("password");
            String roleStr = request.get("role");

            // Basic validation
            if (name == null || email == null || password == null || roleStr == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "All fields are required"));
            }

            // Normalize email to lowercase
            email = email.toLowerCase().trim();

            // Validate admin registration key
            if ("ADMIN".equalsIgnoreCase(roleStr)) {
                String adminKey = request.get("adminKey");
                if (adminKey == null || !adminKey.equals(adminRegistrationKey)) {
                    logger.warn("Failed admin registration attempt for email: {} - invalid key", email);
                    return ResponseEntity.status(403).body(Map.of("error", "Invalid admin registration key"));
                }
            }

            // Check if email exists
            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
            }

            // Parse role
            User.Role role;
            try {
                role = User.Role.valueOf(roleStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid role"));
            }

            // Create user
            User user = new User();
            user.setName(name.trim());
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);

            User savedUser = userRepository.save(user);
            logger.info("User registered successfully: {} as {}", savedUser.getEmail(), savedUser.getRole());

            // Return response
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedUser.getId());
            response.put("name", savedUser.getName());
            response.put("email", savedUser.getEmail());
            response.put("role", savedUser.getRole());
            response.put("message", "Registration successful");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Registration error: {}", e.getMessage());
            return ResponseEntity.status(500).body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");

            if (email == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
            }

            User user = authService.login(email, password);
            String token = jwtUtil.generateToken(user.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
            ));
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}