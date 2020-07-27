package com.example.myapp.controller;

import java.net.URI;
import java.util.Collections;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.global.exception.AppException;
import com.example.global.security.JwtTokenProvider;
import com.example.myapp.dto.request.LoginRequest;
import com.example.myapp.dto.request.SignUpRequest;
import com.example.myapp.dto.response.ApiResponse;
import com.example.myapp.dto.response.JwtAuthenticationResponse;
import com.example.myapp.entity.Role;
import com.example.myapp.entity.RoleName;
import com.example.myapp.entity.User;
import com.example.myapp.repository.RoleRepository;
import com.example.myapp.repository.UserRepository;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	JwtTokenProvider tokenProvider;
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticationUser(@Valid @RequestBody LoginRequest loginRequest){
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail()
						, loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt = tokenProvider.generateToken(authentication);
		
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
		
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<ApiResponse>(ApiResponse.builder().success(false)
					.message("Username is already taken!").build(), HttpStatus.BAD_REQUEST);
		}
		
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<ApiResponse>(ApiResponse.builder().success(false)
					.message("Email Address aleady in use!").build(), HttpStatus.BAD_REQUEST);
		}
		
		User user = signUpRequest.toEntityWithPasswordEncode(passwordEncoder);
		
		Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
				.orElseThrow(()-> new AppException("User Role not set."));
		
		user.setRoles(Collections.singleton(userRole));
		
		User result = userRepository.save(user);
		
		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}")
				.buildAndExpand(result.getUsername()).toUri();
		
		return ResponseEntity.created(location)
				.body(ApiResponse.builder()
						.success(true)
						.message("User registered successfully")
						.build());
	}
	
	
}
