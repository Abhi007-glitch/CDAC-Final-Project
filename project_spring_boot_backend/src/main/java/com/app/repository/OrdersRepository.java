package com.app.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>{

	@Modifying
   @Query("DELETE FROM Orders o WHERE o.id.restId=:restId AND o.id.custId=:custId AND o.id.cartId=:cartId")
   void deleteAllByRestIdAndCustIdAndCartId(@Param("restId") Long restId, @Param("custId") Long custId,@Param("cartId") Long cartId);
	
	
	
	//@Query(nativeQuery = true, value = "SELECT * FROM Orders PARTITION(:partitionName) WHERE rest_id = :restId AND cust_id = :custId")
//	@Query(nativeQuery = true, value = "SELECT * FROM Orders PARTITION(:partitionName) WHERE rest_id = :restId AND cust_id = :custId")
//	ArrayList<Orders> findByRestIdAndCustIdAndPartition(@Param("partitionName") String partitionName,@Param("restId") Long restId, @Param("custId") Long custId);

	
}
