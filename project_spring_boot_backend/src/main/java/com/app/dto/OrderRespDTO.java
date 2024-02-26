package com.app.dto;

import java.time.LocalTime;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.OrderStatus;
import com.app.entities.OrderTableId;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderRespDTO {
private OrderTableId id; // (composite primary key -> restId, custId, orderId(auto generated) 	
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime orderTime;
   
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
    private Integer quantity;
}
