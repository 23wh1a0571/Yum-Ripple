package com.yumripple.backend.config;

import com.yumripple.backend.model.FoodItem;
import com.yumripple.backend.repository.FoodItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;

@Configuration
public class DataBootstrap {

    @Bean
    public CommandLineRunner seedData(FoodItemRepository repo) {
        return args -> {
            if (repo.count() > 0) return;

            // --- BREAKFAST ---
            repo.save(new FoodItem("Oatmeal with Banana", 180, "breakfast"));
            repo.save(new FoodItem("2 Boiled Eggs", 140, "breakfast"));
            repo.save(new FoodItem("Peanut Butter Toast", 220, "breakfast"));

            // --- LUNCH ---
            repo.save(new FoodItem("Grilled Chicken & Rice", 420, "lunch"));
            repo.save(new FoodItem("Paneer Curry + Roti", 380, "lunch"));
            repo.save(new FoodItem("Dal + White Rice", 350, "lunch"));

            // --- DINNER ---
            repo.save(new FoodItem("Vegetable Soup", 150, "dinner"));
            repo.save(new FoodItem("Chapati with Curry", 280, "dinner"));
            repo.save(new FoodItem("Grilled Paneer + Veggies", 330, "dinner"));

            // --- SNACKS ---
            repo.save(new FoodItem("Apple", 95, "snack"));
            repo.save(new FoodItem("Almonds (handful)", 160, "snack"));
            repo.save(new FoodItem("Protein Bar", 200, "snack"));

            System.out.println("✅ Sample food items inserted into database.");
        };
    }
}