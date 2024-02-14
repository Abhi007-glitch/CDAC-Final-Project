package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.DishNameToPartitionMapping;

public interface DishNameToPartitionMappingRepository extends JpaRepository<DishNameToPartitionMapping, Integer> {
    DishNameToPartitionMapping findByDishType(String dishType);
    
}
