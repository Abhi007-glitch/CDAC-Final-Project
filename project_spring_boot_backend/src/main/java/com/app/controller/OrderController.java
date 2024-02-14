package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CheckOrderStatusDTO;
import com.app.dto.CustomerOrderItemRecord;
import com.app.dto.OrderCompletionDTO;
import com.app.dto.OrderDTO;
import com.app.entities.Orders;
import com.app.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
    OrderService orderService;
	static Integer cartCounter = 0;
	
	@PostMapping("/new/{restId}") // this will be required
	public ResponseEntity<?> addNewOrder(@RequestBody OrderDTO orderDto, @PathVariable Long restId){ 
		try {
			Long custId = orderDto.getCustId();
		    
		    
		    ArrayList<CustomerOrderItemRecord> orders = orderDto.getOrders();
		    
		   return  ResponseEntity.status(HttpStatus.CREATED).body(orderService.saveOrders(restId, custId, orders));
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
		}
	}
	
	@PostMapping("/completed/")
	public String removingCompletedOrders(@RequestBody OrderCompletionDTO toDeleteOrder)
	{
	   	return orderService.deleteOrders(toDeleteOrder.getRest_id(),toDeleteOrder.getCust_id(),toDeleteOrder.getCart_id());
	}
	
	
	@GetMapping("/status")
	public List<Orders> checkYourOrdersStatus(@RequestBody CheckOrderStatusDTO orderDetails)
	{
	  	return orderService.checkCustomerOrderStatus(orderDetails.getRestId(),orderDetails.getCustId());
	}
	
}
