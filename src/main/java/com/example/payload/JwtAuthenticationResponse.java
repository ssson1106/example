package com.example.payload;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
	private String accessToken;
	private String tokenType = "Bearer";
}
