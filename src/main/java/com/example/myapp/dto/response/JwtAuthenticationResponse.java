package com.example.myapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {
	
	private String accessToken;
	
	@Builder.Default
	private String tokenType = "Bearer";
	
	public JwtAuthenticationResponse(String accessToken) {
		this.accessToken = accessToken;
	}
}
