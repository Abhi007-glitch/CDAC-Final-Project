package com.app.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dto.UserInfoDTO;
import com.app.entities.Customer;
import com.app.entities.PasswordResetToken;
import com.app.entities.Restaurant;
import com.app.entities.UserInfo;
import com.app.repository.CustomerRepository;
import com.app.repository.RestaurantRepository;
import com.app.repository.TokenRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserInfoService {

	@Autowired
	private TokenRepository tokenRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private PasswordEncoder passEncoder;
	
	@Autowired
	private CustomerRepository custRepo;
	
	@Autowired
	private RestaurantRepository restRepo;
	
//	public UserInfo findByEmail(UserInfoDTO userDTO) {
//		System.out.println("In Service"+userDTO.getEmail());
//		if (userDTO != null) {
//	        System.out.println("In Service" + userDTO.getEmail());
//	        return userRepo.findByEmail(userDTO.getEmail());
//	    } else {
//	        System.out.println("User Null");
//	        return null;
//	    }
//	}
	
	public void sendEmail(UserInfo user) {
		try {
			String resetLink=generateResetToken(user);
			System.out.println("After token generation");
			SimpleMailMessage msg =new SimpleMailMessage();
			msg.setFrom("shauryacdac@gmail.com");// input the senders email ID
			msg.setTo(user.getEmail());
			msg.setSubject("Welcome To My Channel");
			msg.setText("Hello \n\n" + "Please click on this link to Reset your Password :" + resetLink + ". \n\n"
					+ "Regards \n" + "ABC");
			
			javaMailSender.send(msg);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public String generateResetToken(UserInfo user) {
		UUID uuid=UUID.randomUUID();
		LocalDateTime currDateTime=LocalDateTime.now();
		LocalDateTime expiryDateTime=currDateTime.plusMinutes(30);
		PasswordResetToken resetToken=new PasswordResetToken();
		UserInfo attachedUser=userRepo.findByEmail(user.getEmail());
		resetToken.setUser(attachedUser);
		resetToken.setToken(uuid.toString());
		resetToken.setExpiryDateTime(expiryDateTime);
		resetToken.setUser(attachedUser);
		PasswordResetToken token=tokenRepo.save(resetToken);
		if(token!=null) {
			String endpointUrl="http://localhost:8080/user/resetpassword";
			return endpointUrl+"/"+resetToken.getToken();
		}
		return "";
	}
	
	public boolean hasExpired(LocalDateTime expiryDateTime) {
		LocalDateTime currDateTime=LocalDateTime.now();
		return expiryDateTime.isAfter(currDateTime);
	}
	
	public void setNewPassword(UserInfo user) {
		if(user!=null) {
			user.setPassword(passEncoder.encode(user.getPassword()));
			userRepo.save(user);
			if(user.getRoles().equals("USER")) {
				Customer cust=custRepo.findByCustEmail(user.getEmail());
				cust.setCustPassword(passEncoder.encode(user.getPassword()));
			}else {
				Optional<Restaurant> restOptional=restRepo.findByRestEmail(user.getEmail());
				Restaurant rest=restOptional.get();
				rest.setRestPassword(passEncoder.encode(user.getPassword()));
			}
		}
	}
	
	public UserInfo findByEmail(UserInfoDTO userDto) {
		return userRepo.findByEmail(userDto.getEmail());
	}
}
