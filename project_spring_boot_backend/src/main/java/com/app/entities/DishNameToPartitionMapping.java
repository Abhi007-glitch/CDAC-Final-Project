package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
@Entity
public class DishNameToPartitionMapping {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long dishId;
	
	@Column(length = 30)
	private String dishType;
}
