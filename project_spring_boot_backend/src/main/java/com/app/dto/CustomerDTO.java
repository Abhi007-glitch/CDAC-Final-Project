package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerDTO {
	
	private Long id;
	private String custFirstName;
	private String custLastName;
	private String custEmail;
    private String custPassword;
	private String custAddr;
	private String custContact;
	private String custUPIID;
	private String custRole;
}
