package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.RestaurantRespDTO;
import com.app.service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController {
	
	@Autowired
	private SearchService searchService;
	
	@GetMapping("/bycuisine/{cuisineName}")
	public ResponseEntity<List<RestaurantRespDTO>> searchByCuisineName(@PathVariable String cuisineName){
		try {
			List<RestaurantRespDTO> restaurants=searchService.searchByCuisineName(cuisineName);
			return ResponseEntity.ok(restaurants);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(null);
		}
	}
	
	@GetMapping("/bydish/{dishName}")
	public ResponseEntity<List<RestaurantRespDTO>> searchByDishName(@PathVariable String dishName){
		try {
			List<RestaurantRespDTO> restaurants=searchService.searchByDishName(dishName);
			return ResponseEntity.ok(restaurants);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(null);
		}
	}
}
