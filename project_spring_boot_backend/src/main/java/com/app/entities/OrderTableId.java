package com.app.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class OrderTableId {
	
	@Id
	@Column(name="order_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId; 
	
	 @Column(name = "rest_id")
	 private Integer restId;

	 @Column(name = "item_id")
	 private Integer itemId;
	 
	 
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
