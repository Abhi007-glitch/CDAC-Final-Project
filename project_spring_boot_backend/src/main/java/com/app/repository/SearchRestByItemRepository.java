package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.SearchRestByItem;

public interface SearchRestByItemRepository extends JpaRepository<SearchRestByItem,Long> {

}
