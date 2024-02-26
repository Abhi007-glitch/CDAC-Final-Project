package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.app.dto.CustomerDTO;
import com.app.dto.JwtDTO;
import com.app.entities.Customer;
import com.app.service.CustomerService;
import com.app.service.JwtService;


@RestController
@RequestMapping("/customer")
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
	public ResponseEntity<?> addNewCustomer(@RequestBody CustomerDTO custDto) {
	    try {
	    	custDto.setCustRole("USER");
	        return ResponseEntity.status(HttpStatus.CREATED).body(custService.addNewCustomer(custDto));
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	    }
	}

	
	@GetMapping("/owndetails/{custId}")
	@PreAuthorize("hasAuthority('USER')")
	public ResponseEntity<?> getCustomerById(@PathVariable Long custId) {
	    try {
	    	CustomerDTO cust=custService.getCustomerById(custId);
	    	if(cust!=null) {
	        return ResponseEntity.ok(cust);
	    	}else
	    	{
	    		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Customer Not Found");
	    	}
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(null);
	    }
	}

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateAndGetToken(@org.springframework.web.bind.annotation.RequestBody AuthRequest authRequest) {
	    try {
	        Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(authRequest.getUseremail(), authRequest.getPassword())
	        );
	       String token=jwtService.generateToken(authRequest.getUseremail());
	       Customer cust=custService.findByEmail(authRequest.getUseremail());
	        if (authentication.isAuthenticated()) {
	        	JwtDTO jwtDto=new JwtDTO();
	        	jwtDto.setId(cust.getCustId());
	        	jwtDto.setToken(token);
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
