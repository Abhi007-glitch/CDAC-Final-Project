package com.app.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class OrderTableId implements Serializable{
	
	@Column(name="order_id") // auto generated
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId; 
	
	 @Column(name = "rest_id")
	 private Long restId;

	 @Column(name = "item_id")
	 private Long itemId;
	 
	 @Column(name="cart_id")
	 private Long cartId;  // will be assigned by backend 
	 
	 @Column(name="cust_id")
	 private Long custId;
	 
	 public OrderTableId(Long rest_id,Long cust_id,Long item_id,Long cart_id) {
		// TODO Auto-generated constructor stub
		 this.restId=rest_id;
		 this.custId=cust_id;
		 this.itemId=item_id;
		 this.cartId=cart_id;
	} 
	 
	 @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        OrderTableId that = (OrderTableId) o;
	        return restId.equals(that.restId) && itemId.equals(that.itemId) && orderId.equals(that.getOrderId());
	    }

	    @Override
	    public int hashCode() {
	        return Objects.hash(restId, itemId,orderId);
	    }
	
	

}
