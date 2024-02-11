package com.app.entities;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="orders")
@Entity
public class Orders {

	@EmbeddedId //composite primary key
    private RestItemId id; // (composite primary key -> restId, custId, orderId(auto generated) 	
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime orderTime;
   
	private OrderStatus status;
	
    private int quantity;
}
