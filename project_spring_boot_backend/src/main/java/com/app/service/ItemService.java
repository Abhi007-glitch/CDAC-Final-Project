package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;

import com.app.dto.ItemDTO;
import com.app.entities.CuisineNameToPartition;
import com.app.entities.DishNameToPartitionMapping;
import com.app.entities.Items;
import com.app.entities.SearchRestByCuisine;
import com.app.entities.SearchRestByItem;
import com.app.repository.CuisineRepository;
import com.app.repository.DishNameRepository;
import com.app.repository.ItemsRepository;
import com.app.repository.SearchCuisineRepository;
import com.app.repository.SearchItemRepository;

@Service
@Transactional(dontRollbackOn  = { Exception.class,PersistenceException.class,UnexpectedRollbackException.class })
public class ItemService {

	@Autowired
	private ItemsRepository itemRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private CuisineRepository cuisineRepo;
	
	@Autowired
	private DishNameRepository dishRepo;
	
	
	@Autowired
    private EntityManager entityManager;
	
	@Autowired
	private SearchCuisineRepository searchCuisineRepo;
	
	static Long dishId=1L;
	
	public void addNewSearchCuisine(Long cuisineId, Long restId) {
		System.out.println("in search cuisine");
		String param=cuisineId+","+restId;
        String sql = "INSERT INTO Search_Rest_By_Cuisine VALUES("+param+")";
        Query query = entityManager.createNativeQuery(sql);

        query.executeUpdate();
    }

    public void addNewSearchDish(Long dishId, Long restId) {
    	String param=dishId+","+restId;
    	String sql = "INSERT INTO Search_Rest_By_Item VALUES("+param+")";
        
        Query query = entityManager.createNativeQuery(sql);

        query.executeUpdate();
      
    }
	
	public void checkDish(String dishName,Long restId) {

		try {
		DishNameToPartitionMapping dish=dishRepo.findByDishName(dishName);
		if(dish!=null) {
			
			addNewSearchDish(dish.getDishId(), restId);
			
		}else {
			
			DishNameToPartitionMapping newDish=new DishNameToPartitionMapping(dishId++,dishName);
			dishRepo.save(newDish);
			
			callAddPartitionForDish(newDish.getDishId());
			System.out.println(newDish);
			addNewSearchDish(newDish.getDishId(), restId);
			
		}
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			dishId--;
		}
	}
	
	public void callAddPartitionForDish(Long dishId) {
	    try {
	    	
	        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("add_partition_for_Dish");
	        procedureQuery.registerStoredProcedureParameter("dishId", Long.class, ParameterMode.IN);
	        procedureQuery.setParameter("dishId", dishId);
	        procedureQuery.execute();
	       
	    } catch (PersistenceException e) {
	        e.printStackTrace(); 
	    }
	}
	
	public ItemDTO addNewItem(Long restId,ItemDTO itemDto) {
		
		try {
			CuisineNameToPartition cuisine = cuisineRepo.findByCuisineName(itemDto.getCuisineType().name());
			
			if(cuisine != null) {
			
			checkDish(itemDto.getDishType(),restId);
			
			Items item=mapper.map(itemDto, Items.class);
			item.setRestId(itemDto.getRestId());
			Items persistentItem =itemRepo.save(item);
			
			SearchRestByCuisine searchCuisine= searchCuisineRepo.checkIfRestWithGivenCuisionPresent(restId,cuisine.getCuisineId());
			if(searchCuisine==null) {
				addNewSearchCuisine(cuisine.getCuisineId(), restId);
			}
			
			System.out.println("after search cuisine");
			return mapper.map(persistentItem, ItemDTO.class);
			}else {
				throw new BadCredentialsException("Cuisine Name Invalid");
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}

	public void deleteItem(Long id) throws NotFoundException {
	    Optional<Items> optionalItem = itemRepo.findById(id);

	    if (optionalItem.isPresent()) {
	        itemRepo.deleteById(id);
	    } else {
	        throw new NotFoundException();
	    }
	}

	public List<ItemDTO> getAllItemsByRestId(Long restId) {
		
		List<Items> items=itemRepo.findByRestId(restId);

	    return items.stream()
	    		.map(item->mapper.map(item, ItemDTO.class))
	    		.collect(Collectors.toList());
	}
	
}
