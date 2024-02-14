package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
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

	public void deleteItem(Long id) throws NotFoundException {
	    Optional<Items> optionalItem = itemRepo.findById(id);

	    if (optionalItem.isPresent()) {
	        itemRepo.deleteById(id);
	    } else {
	        throw new NotFoundException();
	    }
	}
	
}
