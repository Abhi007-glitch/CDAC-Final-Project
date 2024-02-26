package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.RestaurantRespDTO;
import com.app.entities.CuisineNameToPartition;
import com.app.entities.DishNameToPartitionMapping;
import com.app.repository.CuisineRepository;
import com.app.repository.DishNameRepository;
import com.app.repository.RestaurantRepository;

@Service
@Transactional
public class SearchService {
	
	@Autowired
	private CuisineRepository cuisineRepo;
	
	@Autowired
	private DishNameRepository dishRepo;
	
	@Autowired
	private RestaurantRepository restRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
    private EntityManager entityManager;
	
	public List<RestaurantRespDTO> searchByCuisineName(String cuisineName) {
		try {
			CuisineNameToPartition cuisine =cuisineRepo.findByCuisineName(cuisineName);
			System.out.println(cuisine);
			List<Integer>restIds= searchRestByCuisine(cuisine.getCuisineId());
			restIds.forEach(rest->System.out.println(rest));
			return restRepo.findAllById(restIds.stream()
			        .map(Long::valueOf)
			        .collect(Collectors.toList()))
			        .stream()
			        .map(rest -> mapper.map(rest, RestaurantRespDTO.class))
			        .collect(Collectors.toList());

		}catch (Exception e) {
			e.printStackTrace();
			return null;
		
		}
		
	}

	    public List<Integer> searchRestByCuisine(Long cuisineId) {
	    	String partitionName="p"+cuisineId;
	    	String sql="SELECT rest_id FROM Search_Rest_By_Cuisine  PARTITION ("+ partitionName+")";
	    	Query query= entityManager.createNativeQuery(sql);
	    	List<Integer> restIds=query.getResultList();
	    	
	        return restIds;
	    }

		public List<RestaurantRespDTO> searchByDishName(String dishName) {
			try {
				DishNameToPartitionMapping dish=dishRepo.findByDishName(dishName);
				System.out.println(dish);
				List<Integer>restIds= searchRestByDish(dish.getDishId());
				restIds.forEach(rest->System.out.println(rest));
				return restRepo.findAllById(restIds.stream()
				        .map(Long::valueOf)
				        .collect(Collectors.toList()))
				        .stream()
				        .map(rest -> mapper.map(rest, RestaurantRespDTO.class))
				        .collect(Collectors.toList());

			}catch (Exception e) {
				e.printStackTrace();
			}
			return null;
		}
		
		public List<Integer> searchRestByDish(Long dishId) {
	    	String partitionName="p"+dishId;
	    	String sql="SELECT rest_id FROM Search_Rest_By_Item  PARTITION ("+ partitionName+")";
	    	Query query= entityManager.createNativeQuery(sql);
	    	List<Integer> restIds=query.getResultList();
	    	
	        return restIds;
	    }
}
