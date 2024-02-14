package com.app.entities;

import java.time.LocalTime;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Table(name="orders")
@Entity
public class Orders {

	@EmbeddedId //composite primary key
    private OrderTableId id; // (composite primary key -> restId, custId, orderId(auto generated) 	
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime orderTime;
   
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
    private Integer quantity;
    
     
    public Orders(Long restId, Long custId,Long itemId,Long cartId, LocalTime orderTime, String status, Integer quantity) {
        this.id = new OrderTableId(restId, custId,itemId,cartId); // Set OrderId and cartId to null
        this.orderTime = orderTime;
        this.status = OrderStatus.valueOf(status);
        this.quantity = quantity;
    }


}
