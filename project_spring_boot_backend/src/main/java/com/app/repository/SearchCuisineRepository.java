package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.SearchRestByCuisine;

public interface SearchCuisineRepository extends JpaRepository<SearchRestByCuisine,Long>{
	
	 @Query("Select 0 FROM SearchRestByCuisine o WHERE o.id.restId=:restId AND o.id.cuisineId=:cuisineId")
	 SearchRestByCuisine checkIfRestWithGivenCuisionPresent(@Param("restId") Long restId,@Param("cuisineId") Long cuisineId );
}
