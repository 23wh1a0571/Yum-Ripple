
package com.yumripple.backend.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "food_items")
public class FoodItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String item;
    private int cal;
    private String mealType;

    public FoodItem() {} // Required by JPA

    public FoodItem(String item, int cal, String mealType) {
        this.item = item;
        this.cal = cal;
        this.mealType = mealType;
    }

    // ---------- Getters ----------
    public Long getId()           { return id; }
    public String getItem()       { return item; }
    public int getCal()           { return cal; }
    public String getMealType()   { return mealType; }

    // ---------- Setters ----------
    public void setId(Long id)            { this.id = id; }
    public void setItem(String item)      { this.item = item; }
    public void setCal(int cal)           { this.cal = cal; }
    public void setMealType(String mealType) { this.mealType = mealType; }
}