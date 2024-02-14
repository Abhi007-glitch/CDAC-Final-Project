package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.UserInfo;

public interface UserRepository extends JpaRepository<UserInfo,Long>{
	UserInfo findByEmail(String email);
}
