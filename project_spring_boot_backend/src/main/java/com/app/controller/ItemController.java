package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ItemDTO;
import com.app.service.ItemService;

@RestController
@RequestMapping("/item")
public class ItemController {

	@Autowired
	private ItemService itemService;
	
	@PostMapping("/new/{restId}")
	public ResponseEntity<?> addNewItem(@PathVariable Long restId ,@RequestBody ItemDTO itemDto) {
	    try {
	    	itemDto.setRestId(restId);
	    	ItemDTO newItem=itemService.addNewItem(restId,itemDto);
	    	if(newItem!=null) {
	        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
	    	}else {
	    		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	    	}
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the item.");
	    }
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteItem(@PathVariable Long id){
		try {
			itemService.deleteItem(id);
			return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@GetMapping("/allitems/{restId}")
	public ResponseEntity<?> getAllItemsByRestId(@PathVariable Long restId){
		try {
			return ResponseEntity.ok(itemService.getAllItemsByRestId(restId));
		}catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
