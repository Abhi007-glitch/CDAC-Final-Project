package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dto.CustomerDTO;
import com.app.entities.Customer;
import com.app.entities.UserInfo;
import com.app.repository.CustomerRepository;
import com.app.repository.UserInfoRepository;

@Service
@Transactional
public class CustomerService {
	
	@Autowired
	private CustomerRepository custRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PasswordEncoder passEncoder;
	@Autowired
	private UserInfoRepository userRepo;
	
	public List<Customer> getAllCustomers(){
		return custRepo.findAll();
	}
	public CustomerDTO addNewCustomer(CustomerDTO custDto) {
		Customer custEntity=mapper.map(custDto, Customer.class);
		System.out.println("Entity "+custEntity);
		custEntity.setCustPassword(passEncoder.encode(custEntity.getCustPassword()));
		Customer persistentCust=custRepo.save(custEntity);
		userRepo.save(new UserInfo(persistentCust.getCustEmail(),persistentCust.getCustPassword(),persistentCust.getCustRole()));
		return mapper.map(persistentCust, CustomerDTO.class);
	}
}
