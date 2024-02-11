package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant ,Long>{
	Optional<Restaurant> findByRestEmail(String restEmail);
}
