package com.example.myapp.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.myapp.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {

	@NotBlank
	@Size(min = 2, max = 40)
	private String name;

	@NotBlank
	@Size(min = 3, max = 20)
	private String username;

	@NotBlank
	@Size(max = 40)
	@Email
	private String email;

	@NotBlank
	@Size(min = 8, max = 20)
	private String password;

	public User toEntity() {
		return User.builder()
				.name(name).username(username)
				.email(email).password(password)
				.build();
	}
	
	public User toEntityWithPasswordEncode(PasswordEncoder bCryptPasswordEncoder) {
		return User.builder()
				.name(name).username(username)
				.email(email).password(bCryptPasswordEncoder.encode(password))
				.build();
	}
}
