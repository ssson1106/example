package com.example.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Builder
public class User extends AbstractEntity {
	
	@Column(nullable = false, length = 20, unique=true)
	private String userId;
	private String password;
	private String name;
	private String email;
}
