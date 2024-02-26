package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.CuisineNameToPartition;

public interface CuisineRepository extends JpaRepository<CuisineNameToPartition, Long>{
	
	CuisineNameToPartition findByCuisineName(String cuisineName);
}
