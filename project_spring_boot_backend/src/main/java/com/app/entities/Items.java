package com.app.entities;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
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
public class Items extends BaseEntity {

    @NotBlank(message = "Item name is required")
    @Column(length = 60)
    private String itemName;

    @NotNull(message = "Item price is required")
    private BigDecimal itemPrice;

    @Lob
    private byte[] itemImage;

    @Column(length=120)
    private String itemDescription;

    @NotNull(message = "Veg status is required")
    private Boolean isVeg;

   @Enumerated(EnumType.STRING)
   @Column(length = 50)
    private CuisineType cuisineType; 
   
   @ManyToOne(fetch = FetchType.LAZY
		   ,cascade = CascadeType.ALL)
   @JoinColumn(name="restaurant_id")
   private Restaurant rest;
   
   @ManyToOne(fetch = FetchType.LAZY,
		   cascade = CascadeType.ALL)
   @JoinColumn(name="order_id")
   private Orders order;
   
   
   
   
   
   
   
   
   
}

