package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.PasswordResetToken;



public interface TokenRepository extends JpaRepository<PasswordResetToken,Long>{

	PasswordResetToken findByToken(String token);

}
