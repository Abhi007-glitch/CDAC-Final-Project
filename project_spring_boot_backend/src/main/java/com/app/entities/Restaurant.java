package com.app.entities;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@ToString
@Table(name = "restaurant")
@Entity
public class Restaurant extends BaseEntity {

    @NotBlank(message = "Name is required")
    @Column(length = 50)
    private String restName;

    @NotNull(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Column(unique = true, length = 50)
    private String restEmail;

	/*
	 * @NotBlank(message = "Password is required")
	 * 
	 * @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{6,20}", message
	 * =
	 * "Password should have at least one alphabet, one digit, and be between 6 and 20 characters"
	 * )
	 * 
	 * @Size(min = 6, max = 255, message =
	 * "Password should be between 6 and 255 characters")
	 */
    private String restPassword;

    @NotBlank(message = "Address is required")
    @Size(min = 10, max = 100)
    @Column(length = 100)
    private String restAddr;

    @Size(max = 15)
    @Pattern(regexp = "[0-9+()-]*", message = "Contact should contain only numbers and allowed symbols: +()-")
    @Column(unique = true, length = 15)
    private String restContact;

    @Lob
    private byte[] restImage;

    @Size(min = 4, max = 20)
    @Pattern(regexp = "^[a-zA-Z0-9.]{4,20}$", message = "UPI ID should be alphanumeric and between 4-20 characters")
    @Column(unique = true, length = 40)
    private String restUPIID;

    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime restOpeningTime;

    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime restClosingTime;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private CuisineType cuisine;
    
    private String restRole;
    
    /*@OneToMany(mappedBy = "rest",
    		cascade = CascadeType.ALL,
    		orphanRemoval = true)
    private List<Items>  items=new ArrayList<Items>();
    
    @OneToMany(mappedBy = "rest",
			cascade = CascadeType.ALL,
    		orphanRemoval = true)
    private List<Orders> orders=new ArrayList<Orders>();
    */
    
}
