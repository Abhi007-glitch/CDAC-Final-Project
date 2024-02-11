package com.app.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class SearchItemBycuisine {

	@EmbeddedId
	private SearchItemBycuisineId id;
}
