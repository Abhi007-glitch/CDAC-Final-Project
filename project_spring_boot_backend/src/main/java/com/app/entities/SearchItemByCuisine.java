package com.app.entities;

import javax.persistence.EmbeddedId;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name="searchitembycuisine")
public class SearchItemByCuisine {

	@EmbeddedId
	private SearchRestByCuisineId id;
}
