package com.example.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class SignUpRequest {
	
	@NotBlank
	@Size(min=4, max = 40)
	private String name;
	
	@NotBlank
	@Size(min=4, max = 20)
	private String username;
	
	@NotBlank
	@Size(min=8, max = 20)
	private String password;
	
	@NotBlank
	@Size(max = 40)
	@Email
	private String email;
}
