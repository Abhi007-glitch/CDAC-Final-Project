package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthRequest;
import com.app.dto.JwtDTO;
import com.app.dto.RestaurantDTO;
import com.app.dto.RestaurantRespDTO;
import com.app.entities.Restaurant;
import com.app.service.JwtService;
import com.app.service.RestaurantService;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

	@Autowired
	private RestaurantService restService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	@PostMapping("/new")
	public ResponseEntity<?> addNewRestaurant(@RequestBody RestaurantDTO restDto) {
	    try {
	    	restDto.setRestRole("ADMIN");
	        Restaurant result = restService.addNewRestaurant(restDto);
	        return ResponseEntity.status(HttpStatus.CREATED).body(result);
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the restaurant.");
	    }
	}

	
	
	// to be done
	
//	@GetMapping("/{id}")
//	public ResponseEntity<?> getAllItemsOfParticularRestaurant(@PathVariable String id)
//	{
//		
//	}
	
//	@GetMapping("/all/{restId}")
//	public ResponseEntity<?> getAllItemsByRestId(@PathVariable Long restId,
//			@RequestParam(defaultValue = "0",required = false) int pageNumber,
//			@RequestParam(defaultValue = "4",required = false) int pageSize) {
//		System.out.println("PageNumber: "+pageNumber+", PageSize:"+pageSize);
//	    try {
//	        List<ItemDTO> items = restService.getAllItemsByRestId(restId,pageNumber,pageSize);
//	        if(items.isEmpty())
//	        	return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//	        return ResponseEntity.ok(items);
//	    } catch (Exception e) {
//	        e.printStackTrace();
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                .body(null);
//	    }
//	}
	
	
	@GetMapping("/owndetails/{restId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<?> getRestaurantById(@PathVariable Long restId){
		try {
			RestaurantRespDTO restaurant=restService.getRestaurantById(restId);
			if(restaurant!=null) {
				return ResponseEntity.ok(restaurant);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Restaurant Not Found");
			}
		}catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	@GetMapping("/all")
	public ResponseEntity<?> getAllRestaurants(){
		try {
			List<RestaurantRespDTO> restaurants=restService.getAllRestaurants();
			if(restaurants.isEmpty())
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			return ResponseEntity.ok(restaurants);
		}catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
	    try {
	    	System.out.println(authRequest);
	        Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(authRequest.getUseremail(), authRequest.getPassword())
	        );
	       String jwtToken=jwtService.generateToken(authRequest.getUseremail());
	       Restaurant rest=restService.findByEmail(authRequest.getUseremail());
	        if (authentication.isAuthenticated()) {
	        	JwtDTO jwtDto=new JwtDTO();
	        	jwtDto.setId(rest.getRestId());
	        	jwtDto.setToken(jwtToken);
	        	return ResponseEntity.status(HttpStatus.OK).body(jwtDto);
	        } else {
	            throw new BadCredentialsException("Invalid User request!");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw e;
	    }
	}
}
