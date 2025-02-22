package com.app.entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Table(name = "item")
@Entity
public class Items  {
    
	@Id
	 @Column(name="item_id")
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long itemId;
	
    @NotBlank(message = "Item name is required")
    @Column(length = 60)
    private String itemName;

    @NotNull(message = "Item price is required")
    private BigDecimal itemPrice;

    @Lob
    private byte[] itemImage;

    @Column(length=120)
    private String itemDescription;

    @NotNull(message = "isVeg status is required")
    private Boolean isVeg;

   @NotNull(message = "a item must belong to some restaurant")
   @Column(name="rest_id")
   private Long restId;   // (rest->rest_id)
   
   @Enumerated(EnumType.STRING)
   @Column(length = 50)
    private CuisineType cuisineType;
   
   @NotNull(message ="Dish type should be defined i.e Biryani,Idli")    // new added property
   @Column(name="dish_type")
   private String dishType;
   
//   @ManyToOne(fetch = FetchType.LAZY,
//		   cascade = CascadeType.ALL)
//   
//   @JoinColumn(name="order_id") /// why order in item?
//   private Orders order;
   
   //made changes
   
   
   
   
   
   
   
}

