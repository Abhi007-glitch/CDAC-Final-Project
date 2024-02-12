package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class CuisineNameToPartition {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name="cuisine_id")
   private Long cuisineId ;
   
   @Column(name="cuisine_name")
   private String cuisineName;
   
	
}
