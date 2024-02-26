package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.EmailRequest;
import com.app.service.EmailService;

@RestController

public class EmailController {
	@RequestMapping("/welcome") 
	public String welcome()
	{
		return "hello world";
	}
	@Autowired
	private EmailService emailService;
	@RequestMapping(value="/sendemail",method=RequestMethod.POST)
	public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request)
	{
		System.out.println(request);
		boolean result=this.emailService.sendEmail(request.getSubject(), request.getMessage(), request.getTo());
		if(result)
		{
			return ResponseEntity.ok("Email Sent");
		}
		else
		{
			return ResponseEntity.ok("not sent");
		}
		
		
	}

}
