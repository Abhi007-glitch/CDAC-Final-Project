package com.app.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class RestItem {
	
	@EmbeddedId
    private RestItemId id; 
		
	
}
