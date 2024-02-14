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

import com.app.dto.AuthRequest;
import com.app.dto.CustomerDTO;
import com.app.entities.Customer;
import com.app.service.CustomerService;
import com.app.service.JwtService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;


@RestController
@RequestMapping("/customer")
@Validated
public class CustomerController {

	
	@Autowired
	private CustomerService custService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }
	
	@PostMapping("/new")
	public ResponseEntity<?> addNewCustomer(@RequestBody @Valid CustomerDTO custDto) {
	    try {
	        return ResponseEntity.status(HttpStatus.CREATED).body(custService.addNewCustomer(custDto));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the customer.");
	    }
	}

	
	@GetMapping("/all")
	@PreAuthorize("hasAuthority('USER')")
	public ResponseEntity<List<Customer>> getAllCustomers() {
	    try {
	        List<Customer> Customers = custService.getAllCustomers();
	        return ResponseEntity.ok(Customers);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(null);
	    }
	}

	@PostMapping("/authenticate")
	public String authenticateAndGetToken(@org.springframework.web.bind.annotation.RequestBody AuthRequest authRequest) {
	    try {
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
