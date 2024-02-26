package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Entity
@EqualsAndHashCode(callSuper = false,doNotUseGetters = true,of="custEmail")
public class Customer{
	
	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long custId;
	
//	@NotBlank(message = "Name is required")
//	@Column(length=30)
//	private String custName;
	
//	@NotBlank(message = "Last Name is required")
//	@Column(length=30)
//	private String custLastName;
	
	@NotNull(message = "Email is required")
	@Email(message = "Please provide a valid email address")
	@Column(unique = true,length=50)
	private String custEmail;

//	@NotBlank(message = "Password is required")
//    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{6,20}",
//            message = "Password should have at least one alphabet, one digit, and be between 6 and 20 characters")
//    @Size(min = 6, max = 255, message = "Password should be between 6 and 255 characters")
    private String custPassword;
	
	@NotBlank(message = "Address is required")
	@Size(min = 10, max = 100)
	@Column(length=100)
	private String custAddr;
//	
//	@Size(max=15)
//	@Pattern(regexp = "[0-9+()-]*", message = "Contact should contain only numbers and allowed symbols: +()-")
//	@Column(unique = true,length = 15)
//	private String custContact;
	
//	@Size(min=4, max=20)
//	@Pattern(regexp = "^[a-zA-Z0-9.]{4,20}$", message = "UPI ID should be alphanumeric and between 4-20 characters")
//	@Column(unique=true,length=40)
//	private String custUPIID;
	
	private String custRole;
	
	/*
	 * @OneToMany(mappedBy = "cust", cascade = CascadeType.ALL, orphanRemoval =
	 * true) private List<Orders> orders=new ArrayList<Orders>();
	 */
	
}
