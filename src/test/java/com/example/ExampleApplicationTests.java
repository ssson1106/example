package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.api.entity.User;
import com.example.api.repository.UserRepository;

@SpringBootTest
class ExampleApplicationTests {

	@Autowired
	UserRepository userRepository;
	
	
	@Test
	void contextLoads() {
		
		
		
		
	}

}
