package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.DishNameToPartitionMapping;

public interface DishNameRepository extends JpaRepository<DishNameToPartitionMapping,Long>{
	
	DishNameToPartitionMapping findByDishName(String dishName);
}
