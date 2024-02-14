package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserInfoDTO;
import com.app.entities.PasswordResetToken;
import com.app.entities.UserInfo;
import com.app.repository.TokenRepository;
import com.app.service.UserInfoService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserInfoService userService;
	
	@Autowired
	private TokenRepository tokenRepo;
	
	
	@PostMapping("/forgotpass")
	private ResponseEntity<?> forgotPassword(@RequestBody UserInfoDTO userDTO) {
	    try {
	        UserInfo user = userService.findByEmail(userDTO);
	        if (user != null) {
	           userService.sendEmail(user);
	            return ResponseEntity.ok("Password reset email sent successfully");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                                 .body("User not found");
	        }
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
	    }
	}
	
	@PostMapping("/resetpassword/{token}")
	public ResponseEntity<?> resetPassword(@RequestBody UserInfoDTO userDto,@PathVariable String token){
		try {
			PasswordResetToken reset =tokenRepo.findByToken(token);
			if(reset !=null && userService.hasExpired(reset.getExpiryDateTime())) {
				UserInfo user=userService.findByEmail(userDto);
					userService.setNewPassword(user);
					return ResponseEntity.ok("Password reset successfully");
			}else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Invalid or expired token");
			}
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error");
		}
	}
	
	
	
	
	
	
	
	
	
}
