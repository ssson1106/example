package com.example.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.Role;
import com.example.api.entity.RoleName;


public interface RoleRepository extends JpaRepository<Role, Long>{
	Optional<Role> findByName(RoleName rolename);
}
