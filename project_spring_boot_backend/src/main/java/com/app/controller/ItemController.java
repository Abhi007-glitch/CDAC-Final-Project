package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ItemDTO;
import com.app.service.ItemService;

@RestController
@RequestMapping("/item")
@Validated
public class ItemController {

	@Autowired
	private ItemService itemService;
	
	@PostMapping("/new")
	public ResponseEntity<?> addNewItem(@RequestBody ItemDTO itemDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(itemService.addNewItem(itemDto));
	}
}
