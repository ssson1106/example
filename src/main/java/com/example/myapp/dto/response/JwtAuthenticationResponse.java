package com.example.myapp.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class JwtAuthenticationResponse {
	
	private String accessToken;
	
	@Builder.Default
	private String tokenType = "Bearer";
}
