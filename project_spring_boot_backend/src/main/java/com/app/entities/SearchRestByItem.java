package com.app.entities;


import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import lombok.Getter;


@Entity
public class SearchRestByItem {
	
	@EmbeddedId
    private SearchRestByItemId id;
		
}


