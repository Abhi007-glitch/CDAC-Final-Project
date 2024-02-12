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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthRequest;
import com.app.dto.ItemDTO;
import com.app.dto.RestaurantDTO;
import com.app.dto.RestaurantRespDTO;
import com.app.service.ItemService;
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
	
	@Autowired
	private ItemService itemService;
	
	@PostMapping("/new/{id}")
	public ResponseEntity<?> addNewItem(@RequestBody ItemDTO itemDto,@PathVariable Long id){
		return ResponseEntity.status(HttpStatus.CREATED).body(itemService.addNewItem(itemDto,id));
	}
	
	@GetMapping("/welcome")
	@PreAuthorize("hasAuthority('ADMIN')")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }
	
	@PostMapping("/new")
	public ResponseEntity<?> addNewRestaurant(@RequestBody @Valid RestaurantDTO restDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(restService.addNewRestaurant(restDto));
	}
	
	@GetMapping("/all")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<?> getAllRestaurants(
			@RequestParam(defaultValue = "0",required = false) int pageNumber,
			@RequestParam(defaultValue = "4",required = false) int pageSize) {
		System.out.println("PageNumber: "+pageNumber+", PageSize:"+pageSize);
	    try {
	        List<RestaurantRespDTO> restaurants = restService.getAllRestaurants(pageNumber,pageSize);
	        if(restaurants.isEmpty())
	        	return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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
