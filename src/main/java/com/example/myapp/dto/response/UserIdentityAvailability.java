package com.example.myapp.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserIdentityAvailability {
	private Boolean available;
}
