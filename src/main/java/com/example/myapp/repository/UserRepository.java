package com.example.myapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myapp.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional	<User> findByEmail(String email);
	
	Optional<User> findByUsernameOrEmail(String username, String email);
	
	List<User> findByIdIn(List<Long> userIds);
	
	Optional<User> findByUsername(String username);
	
	Boolean existsByUsername(String username);
	
	Boolean existsByEmail(String Email);
	
}