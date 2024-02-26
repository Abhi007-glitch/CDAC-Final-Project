package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerDTO {
	
	private Long id;
	private String custEmail;
    private String custPassword;
	private String custAddr;
	private String custRole;
}
