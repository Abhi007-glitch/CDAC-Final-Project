package com.app.dto;

import java.time.LocalTime;

import com.app.entities.CuisineType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RestaurantDTO {
	
	private Long id;
    private String restName;
    private String restEmail;
    private String password;
    private String restAddr;
    private String restContact;
    private byte[] restImage;
    private String restUPIID;
    private LocalTime restOpeningTime;
    private LocalTime restClosingTime;
    private CuisineType cuisine;
    private String role;
    
}
