package com.app.service;

import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.RestaurantDTO;
import com.app.entities.Restaurant;
import com.app.entities.UserInfo;
import com.app.repository.RestaurantRepository;
import com.app.repository.UserInfoRepository;

@Service
@Transactional
public class RestaurantService {
	
	@Autowired
	private RestaurantRepository restRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder passEncoder;
	
	@Autowired
	private UserInfoRepository userRepo;
	
	public List<Restaurant> getAllRestaurants(){
		return restRepo.findAll();
	}
	
	public Restaurant addNewRestaurant(RestaurantDTO restDto) {
		Restaurant restEntity=mapper.map(restDto, Restaurant.class);
		restEntity.setRestPassword(passEncoder.encode(restEntity.getRestPassword()));
		Restaurant persistentRest=restRepo.save(restEntity);
		userRepo.save(new UserInfo(persistentRest.getRestEmail(),persistentRest.getRestPassword(),persistentRest.getRestRole()));
		return mapper.map(persistentRest, Restaurant.class);
	}
	
}
