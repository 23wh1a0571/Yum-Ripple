
package com.yumripple.backend.repository;

import com.yumripple.backend.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

    /**
     * Find all food items for a specific meal type (e.g., breakfast, lunch, dinner).
     */
    List<FoodItem> findByMealType(String mealType);

    /**
     * Find food items whose names contain the given keyword (case-insensitive).
     */
    List<FoodItem> findByItemContainingIgnoreCase(String keyword);

    /**
     * (Optional) Find food items within a calorie range.
     */
    List<FoodItem> findByCalBetween(int minCal, int maxCal);
}