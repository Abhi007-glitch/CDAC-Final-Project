package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomerOrderItemRecord {
    
	private Long itemId;
	private Integer quantity;
}
