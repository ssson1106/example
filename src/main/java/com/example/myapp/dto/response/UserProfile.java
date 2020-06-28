package com.example.myapp.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfile {
	private Long id;
    private String username;
    private String name;
    private LocalDateTime joinedAt;
}
