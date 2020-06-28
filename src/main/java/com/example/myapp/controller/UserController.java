package com.example.myapp.controller;

import java.time.Instant;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.global.exception.ResourceNotFoundException;
import com.example.global.security.CurrentUser;
import com.example.global.security.UserPrincipal;
import com.example.myapp.dto.response.UserIdentityAvailability;
import com.example.myapp.dto.response.UserProfile;
import com.example.myapp.dto.response.UserSummary;
import com.example.myapp.entity.User;
import com.example.myapp.repository.UserRepository;


@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		UserSummary userSummary 
			= UserSummary.builder()
				.id(currentUser.getId())
				.username(currentUser.getUsername())
				.name(currentUser.getName()).build();
		return userSummary;
	}
	
	@GetMapping("/user/checkUsernameAvailability")
	public UserIdentityAvailability checkUsernameAvailability(String username) {
		Boolean isAvailable = !userRepository.existsByUsername(username);
		return UserIdentityAvailability.builder().available(isAvailable).build();
	}
	
	@GetMapping("/user/checkEmailAvailability")
	public UserIdentityAvailability checkEmailAvailability(String email) {
		Boolean isAvailable = !userRepository.existsByEmail(email);
		return UserIdentityAvailability.builder().available(isAvailable).build();
	}
	
	@GetMapping("/users/{username}")
	public UserProfile getUserProfile(@PathVariable(value="username") String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(()->new ResourceNotFoundException("User", "username", username));
		UserProfile userProfile = UserProfile.builder()
				.name(user.getName())
				.username(user.getUsername())
				.id(user.getId())
				.joinedAt(user.getCreatedDate())
				.build();
		
		return userProfile; 
	}
	
}
