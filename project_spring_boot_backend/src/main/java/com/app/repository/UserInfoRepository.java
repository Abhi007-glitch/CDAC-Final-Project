package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo,Long>{
	Optional<UserInfo> findByEmail(String useremail);

}
