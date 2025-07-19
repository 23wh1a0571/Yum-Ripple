package com.yumripple.backend.controller;

import com.yumripple.backend.dto.AuthRequest;
import com.yumripple.backend.dto.AuthResponse;
import com.yumripple.backend.model.User;
import com.yumripple.backend.repository.UserRepository;
import com.yumripple.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired 
    private UserRepository userRepo;

    @Autowired 
    private PasswordEncoder encoder;

    @Autowired 
    private JwtUtil jwtUtil;

    /**
     * Register a new user. Returns JWT on success.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        String email = user.getEmail().trim().toLowerCase();
        String name = user.getName().trim();

        user.setEmail(email);
        user.setName(name);

        System.out.println("Register request for email: " + email);

        if (userRepo.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser = userRepo.save(user);

        String token = jwtUtil.generateToken(email);
        return ResponseEntity.ok(new AuthResponse(token, email));
    }

    /**
     * Login with email and password. Returns JWT on success.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req){
        return userRepo.findByEmail(req.getEmail().trim().toLowerCase())
                .filter(u -> encoder.matches(req.getPassword(), u.getPassword()))
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(
                        new AuthResponse(jwtUtil.generateToken(u.getEmail()), u.getEmail())))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password"));
    }

    /**
     * (Optional) Endpoint to verify a token.
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "").trim();
            String email = jwtUtil.extractUsername(token);
            return ResponseEntity.ok("Valid token for: " + email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    /**
     * Debug helper: List all users
     */
    @GetMapping("/test-users")
    public List<User> all() { 
        return userRepo.findAll(); 
    }
}