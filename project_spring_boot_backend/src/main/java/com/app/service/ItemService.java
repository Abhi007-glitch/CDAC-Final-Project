package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.app.dto.ItemDTO;
import com.app.entities.DishNameToPartitionMapping;
import com.app.entities.Items;
import com.app.entities.SearchRestByItem;
import com.app.entities.SearchRestByItemId;
import com.app.repository.DishNameToPartitionMappingRepository;
import com.app.repository.ItemsRepository;
import com.app.repository.SearchRestByItemRepository;

@Service
@Transactional
public class ItemService {

	@Autowired
	private ItemsRepository itemRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private DishNameToPartitionMappingRepository dishRepo;
	
	@Autowired
	private SearchRestByItemRepository restItemRepo;
	
	private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ItemService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
	
	public ItemDTO addNewItem(ItemDTO itemDto,Long id) {
		Items item=mapper.map(itemDto, Items.class);
		Items persistentItem =itemRepo.save(item);
		DishNameToPartitionMapping dishMapping=dishRepo.findByDishType(persistentItem.getDishType());
		if(dishMapping.getDishType()!=null) {
			System.out.println("Existing Dish Type"+dishMapping.getDishType());
			restItemRepo.save(new SearchRestByItem(new SearchRestByItemId(dishMapping.getDishId(),id)));
		}else {
			dishRepo.save(dishMapping);
			System.out.println("Created New Dish Type"+dishMapping.getDishType());
			restItemRepo.save(new SearchRestByItem(new SearchRestByItemId(dishMapping.getDishId(),id)));
		}
		return mapper.map(persistentItem, ItemDTO.class);
	}

	public void deleteItem(Long id) {
		itemRepo.deleteById(id);
	}
	String sql = "INSERT INTO your_table_name PARTITION (?) (column1, column2, ...) VALUES (?, ? /* add more placeholders as needed */)";

    jdbcTemplate.update(sql, partitionName, column1, column2 /* provide actual values */);

}
