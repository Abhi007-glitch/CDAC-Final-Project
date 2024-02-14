package com.app.controller;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomerOrderItemRecord;
import com.app.dto.ItemDTO;
import com.app.dto.OrderCompletionDTO;
import com.app.dto.OrderDTO;
import com.app.entities.CheckOrderStatusDTO;
import com.app.entities.Orders;
import com.app.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
    OrderService ser;
	static Integer cartCounter = 0;
	
	@PostMapping("/{restId}") // this will be required
	public String addNewOrder(@RequestBody OrderDTO orderDto, @PathVariable Long restId){ 
		
	
    Long custId = orderDto.getCustId();
    
    
    ArrayList<CustomerOrderItemRecord> orders = orderDto.getOrders();
    
   return  ser.saveOrders(restId, custId, orders);  
		
	}
	
	@PostMapping("/completed/")
	public String removingCompletedOrders(@RequestBody OrderCompletionDTO toDeleteOrder)
	{
	   	return ser.deleteOrders(toDeleteOrder.getRest_id(),toDeleteOrder.getCust_id(),toDeleteOrder.getCart_id());
	}
	
	
	@GetMapping("/status")
	public List<Orders> checkYourOrdersStatus(@RequestBody CheckOrderStatusDTO orderDetails)
	{
	  	return ser.checkCustomerOrderStatus(orderDetails.getRestId(),orderDetails.getCustId());
	}
	
}
