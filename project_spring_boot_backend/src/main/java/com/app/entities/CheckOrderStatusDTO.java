package com.app.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckOrderStatusDTO { // used when user request to get the status of his order
	
	private Long restId;
	private Long custId;

}
