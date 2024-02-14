package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ItemDTO;
import com.app.dto.RestaurantDTO;
import com.app.entities.Items;
import com.app.entities.Restaurant;
import com.app.entities.UserInfo;
import com.app.repository.ItemsRepository;
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
	
	@Autowired
	private ItemsRepository itemRepo;
	
	public List<ItemDTO> getAllItemsByRestId(Long restId, int pageNumber, int pageSize) {
	    Pageable pageable = PageRequest.of(pageNumber, pageSize);
	    Page<Items> itemsPage = itemRepo.findByRestId(restId, pageable);

	    List<ItemDTO> itemDTOList = itemsPage.getContent()
	            .stream()
	            .map(item -> mapper.map(item, ItemDTO.class))
	            .collect(Collectors.toList());

	    return itemDTOList;
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
		
		// procedure to create partition in rest_item(get items by rest)
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("add_partition_for_restaurant");
        procedureQuery.registerStoredProcedureParameter("restId", Long.class, ParameterMode.IN);
        procedureQuery.setParameter("restId", restId);
        procedureQuery.execute();
        
        
        // procedure to create partition in orders table (to store orders restaurant wise)
        StoredProcedureQuery  createPartitionInOrderByRestIdQuery = entityManager.createStoredProcedureQuery("add_partition_in_orders");
        createPartitionInOrderByRestIdQuery.registerStoredProcedureParameter("restId", Long.class, ParameterMode.IN);
        createPartitionInOrderByRestIdQuery.setParameter("restId", restId);
        procedureQuery.execute();
        
    }
}
