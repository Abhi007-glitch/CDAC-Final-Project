package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ItemDTO;
import com.app.entities.Items;
import com.app.repository.ItemsRepository;

@Service
@Transactional
public class ItemService {

	@Autowired
	private ItemsRepository itemRepo;
	
	@Autowired
	private ModelMapper mapper;

	public ItemDTO addNewItem(ItemDTO itemDto) {
		Items item=mapper.map(itemDto, Items.class);
		Items persistentItem =itemRepo.save(item);
		return mapper.map(persistentItem, ItemDTO.class);
	}
	
}
