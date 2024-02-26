package com.app.dto;

import java.math.BigDecimal;

import com.app.entities.CuisineType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ItemDTO {
	
	private Long itemId;
    private String itemName;
    private BigDecimal itemPrice;
    private byte[] itemImage;
    private String itemDescription;
    private Boolean isVeg;
    private CuisineType cuisineType;  
   private int restId; 
}
