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
public class SearchRestByCuisineId implements Serializable{
	@Column(name="cuisine_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cuisineId ;
	
	@Column(name="rest_id")
	private Integer restId ;
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SearchRestByCuisineId that = (SearchRestByCuisineId) o;
        return restId.equals(that.getRestId()) && cuisineId.equals(that.getCuisineId()) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(restId, cuisineId);
    }
}
