package com.app.entities;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
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
@Setter
@Getter
@ToString
@Table(name="orders")
@Entity
public class Orders extends BaseEntity{

	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime orderTime;
	
	@ManyToOne(fetch = FetchType.LAZY,
			cascade = CascadeType.ALL)
	@JoinColumn(name="customer_id")
	private Customer cust;
	
	@ManyToOne(fetch =FetchType.LAZY,
			cascade = CascadeType.ALL)
	@JoinColumn(name="restaurant_id")
	private Restaurant rest;
	
	@OneToMany(mappedBy = "order", 
			cascade = CascadeType.ALL,
			orphanRemoval = true)
    private List<Items> items = new ArrayList<Items>();
}
