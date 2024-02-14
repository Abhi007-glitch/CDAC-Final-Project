package com.app.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class SearchRestByItemId implements Serializable{
    
	@Column(name="dish_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer dishId ;
	
	@Column(name="rest_id")
	private Integer restId ;
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SearchRestByItemId that = (SearchRestByItemId) o;
        return restId.equals(that.getRestId()) && dishId.equals(that.getDishId()) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(restId, dishId);
    }
	
}
