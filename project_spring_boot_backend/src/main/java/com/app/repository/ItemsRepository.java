package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Items;

public interface ItemsRepository extends JpaRepository<Items, Long>{

}
