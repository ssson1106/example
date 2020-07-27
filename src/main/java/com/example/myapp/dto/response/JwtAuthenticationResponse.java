package com.example.myapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {
	
	private String accessToken;
	
	private String tokenType = "Bearer";
	
	public JwtAuthenticationResponse(String accessToken) {
		this.accessToken = accessToken;
	}
}
