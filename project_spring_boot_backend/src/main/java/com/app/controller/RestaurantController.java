package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import com.app.dto.AuthRequest;
import com.app.dto.RestaurantDTO;
import com.app.entities.Restaurant;
import com.app.service.JwtService;
import com.app.service.RestaurantService;

@RestController
@RequestMapping("/restaurant")
@Validated
public class RestaurantController {

	@Autowired
	private RestaurantService restService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@GetMapping("/welcome")
	@PreAuthorize("hasAuthority('ADMIN')")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }
	
	@PostMapping("/new")
	public ResponseEntity<?> addNewRestaurant(@RequestBody @Valid RestaurantDTO restDto){
		System.out.println("Received Restaurant entity: " + restDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(restService.addNewRestaurant(restDto));
	}
	
	@GetMapping("/all")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<List<Restaurant>> getAllRestaurants() {
	    try {
	        List<Restaurant> restaurants = restService.getAllRestaurants();
	        return ResponseEntity.ok(restaurants);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(null);
	    }
	}

	@PostMapping("/authenticate")
	public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
	    try {
	    	System.out.println(authRequest);
	        Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(authRequest.getUseremail(), authRequest.getPassword())
	        );
	       
	        if (authentication.isAuthenticated()) {
	            return jwtService.generateToken(authRequest.getUseremail());
	        } else {
	            throw new BadCredentialsException("Invalid User request!");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw e;
	    }
	}
}
