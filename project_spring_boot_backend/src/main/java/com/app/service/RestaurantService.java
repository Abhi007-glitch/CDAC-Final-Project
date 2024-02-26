package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.RestaurantDTO;
import com.app.dto.RestaurantRespDTO;
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
	
	@Autowired
    private EntityManager entityManager;

	public List<RestaurantRespDTO> getAllRestaurants(int pageNumber, int pageSize){
		Pageable pageable=PageRequest.of(pageNumber, pageSize);
		List<Restaurant> restList=restRepo.findAll(pageable).getContent();
		return restList.stream().
				map(res->mapper.map(res, RestaurantRespDTO.class))
				.collect(Collectors.toList());
	}
	
	public Restaurant addNewRestaurant(RestaurantDTO restDto) {
		Restaurant restEntity=mapper.map(restDto, Restaurant.class);
		restEntity.setRestPassword(passEncoder.encode(restEntity.getRestPassword()));
		Restaurant persistentRest=restRepo.save(restEntity);
		userRepo.save(new UserInfo(persistentRest.getRestEmail(),persistentRest.getRestPassword(),persistentRest.getRestRole()));
		callAddPartitionProcedure(persistentRest.getRestId());
		return mapper.map(persistentRest, Restaurant.class);
	}
	
	private void callAddPartitionProcedure(Long restId) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("add_partition_for_restaurant");
        procedureQuery.registerStoredProcedureParameter("restId", Long.class, ParameterMode.IN);
        procedureQuery.setParameter("restId", restId);
        procedureQuery.execute();
    }
}
