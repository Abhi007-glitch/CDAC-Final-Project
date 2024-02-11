package com.app.entities;

import javax.persistence.EmbeddedId;

public class RestItem {
	@EmbeddedId
    private RestItemId id;  	
}
