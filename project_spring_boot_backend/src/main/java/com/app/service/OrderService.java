package com.app.service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.CustomerOrderItemRecord;
import com.app.entities.Orders;
import com.app.repository.OrdersRepository;



@Service
@Transactional
public class OrderService {
    
	@Autowired
	OrdersRepository orderRepo;
	
	@Autowired
    private EntityManager em;
	
	static private Long cartId =(long)1;
   public String saveOrders(Long restId,Long custId, ArrayList<CustomerOrderItemRecord>orderList)
   {   
	   ArrayList<Orders> formatedOrderTobeSaved =new ArrayList<>();
	    
	    for ( CustomerOrderItemRecord ord : orderList) {
	    	Orders cur = new Orders(restId,custId,ord.getItemId(),cartId,LocalTime.now(),"preparing",ord.getQuantity());
	    	formatedOrderTobeSaved.add(cur);
	    }
	    
	    orderRepo.saveAll(formatedOrderTobeSaved);
	    cartId++;
	   return "saved Orders Successfully";
   }
   
public String deleteOrders(Long restId, Long custId, Long cartId) {
	
	orderRepo.deleteAllByRestIdAndCustIdAndCartId(restId, custId, cartId);

	String partitionName = "p"+restId;
	   String sql = "DELETE FROM Orders PARTITION("+ partitionName+") WHERE rest_id=:restId AND cust_id=:custId AND cart_id=:cartId";
    
	   Query query = em.createNativeQuery(sql);
	   query.setParameter("restId", restId);
	   query.setParameter("custId", custId);
	   query.setParameter("cartId", cartId);
	   int noOfRecordsDeleted = query.executeUpdate();
	   
	return "deleted successfully "+noOfRecordsDeleted+ "records from orders ";
}

public List<Orders> checkCustomerOrderStatus(Long restId,Long custId) {

 
	   String partitionName = "p"+restId;
	   String sql = "SELECT * FROM Orders PARTITION("+ partitionName+") WHERE rest_id = :restId and cust_id=:custId";
       
	   Query query = em.createNativeQuery(sql);
	   query.setParameter("restId", restId);
	   query.setParameter("custId", custId);
	   
	    List<Orders> results = query.getResultList();
	   return results;
}

public Object getAllOrderOfRest(Long restId) {
	// TODO Auto-generated method stub
	
	String partitionName = "p"+restId;
	   String sql = "SELECT * FROM Orders PARTITION("+ partitionName+") WHERE rest_id = :restId ";
    
	   Query query = em.createNativeQuery(sql);
	   query.setParameter("restId", restId);
	   
	    List<Orders> results = query.getResultList();
	   return results;
	
	
}


   
   
}
