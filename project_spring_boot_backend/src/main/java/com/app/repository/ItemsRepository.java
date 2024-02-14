package com.app.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Items;

public interface ItemsRepository extends JpaRepository<Items, Long>{
	
	@Query("SELECT i FROM Items i WHERE i.restId = :restId")
	Page<Items> findByRestId(Long restId, Pageable pageable);

}
