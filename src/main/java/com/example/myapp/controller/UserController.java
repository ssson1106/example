package com.example.myapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.entity.User;
import com.example.myapp.repository.UserRepository;


@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/users")
	public List<User> users(){
		User u1 = new User("username", "password", "name", "email");
		
		userRepository.save(u1);
		return userRepository.findAll(); 
	}
	
	@PostMapping("/user")
	public void user(User user) {
		userRepository.save(user);
	}
	
}