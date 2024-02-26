package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ApiException;
import com.app.dto.CustomerDTO;
import com.app.entities.Customer;
import com.app.entities.Restaurant;
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
	
	public CustomerDTO getCustomerById(Long custId){
		Optional<Customer> optionalCustomer = custRepo.findById(custId);

	    if (optionalCustomer.isPresent()) {
	        Customer cust = optionalCustomer.get();
	        return mapper.map(cust, CustomerDTO.class);
	    }
		return null;
	}
	
	
	public CustomerDTO addNewCustomer(CustomerDTO custDto) {
		try {
			Customer custEntity=mapper.map(custDto, Customer.class);
			System.out.println("Entity "+custEntity);
			custEntity.setCustPassword(passEncoder.encode(custEntity.getCustPassword()));
			Customer persistentCust=custRepo.save(custEntity);
			userRepo.save(new UserInfo(persistentCust.getCustEmail(),persistentCust.getCustPassword(),persistentCust.getCustRole()));
			
			return mapper.map(persistentCust, CustomerDTO.class);
		}catch (Exception e) {
			throw new ApiException(e.getMessage());
		}
	}


	public Customer findByEmail(String useremail) {
		Optional<Customer> cust=custRepo.findByCustEmail(useremail);
		if(cust.isPresent()) {
			Customer customer=cust.get();
			return customer;
		}
		return null;
	}
}
