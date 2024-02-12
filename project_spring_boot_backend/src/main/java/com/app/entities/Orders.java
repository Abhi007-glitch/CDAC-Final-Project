package com.app.entities;

import java.time.LocalTime;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="orders")
@Entity
public class Orders {

	@EmbeddedId //composite primary key
    private OrderTableId id; // (composite primary key -> restId, custId, orderId(auto generated) 	
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime orderTime;
   
	private OrderStatus status;
	
    private int quantity;
}
