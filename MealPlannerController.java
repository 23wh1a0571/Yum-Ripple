 package com.yumripple.backend.controller;

import com.yumripple.backend.model.FoodItem;
import com.yumripple.backend.repository.FoodItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MealPlannerController {

    private final FoodItemRepository repo;

    public MealPlannerController(FoodItemRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/mealplan")
    public Map<String, List<Map<String, Object>>> getMealPlan(@RequestParam int calories) {
        List<FoodItem> breakfastItems = repo.findByMealType("breakfast");
        List<FoodItem> lunchItems = repo.findByMealType("lunch");
        List<FoodItem> dinnerItems = repo.findByMealType("dinner");
        List<FoodItem> snackItems = repo.findByMealType("snack");

        Random rand = new Random();
        Map<String, List<Map<String, Object>>> result = new HashMap<>();

        result.put("breakfast", pickRandomItems(breakfastItems, rand));
        result.put("lunch", pickRandomItems(lunchItems, rand));
        result.put("dinner", pickRandomItems(dinnerItems, rand));
        result.put("snacks", pickRandomItems(snackItems, rand));

        return result;
    }

    private List<Map<String, Object>> pickRandomItems(List<FoodItem> items, Random rand) {
        Collections.shuffle(items, rand);
        return items.stream()
                .limit(2)
                .map(item -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("item", item.getItem());
                    map.put("cal", item.getCal());
                    return map;
                })
                .collect(Collectors.toList());
    }
}