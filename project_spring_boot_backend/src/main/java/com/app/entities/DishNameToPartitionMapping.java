package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class DishNameToPartitionMapping {
	@Id
	@Column(name="dish_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer dishId;
	
	@OneToMany
	@Column(name="dish_name") // this will be in one to many relation with items table 
	String dishName;
   
}
