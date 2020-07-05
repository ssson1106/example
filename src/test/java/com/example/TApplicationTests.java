package com.example;

import java.util.Base64;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.global.security.UserPrincipal;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TApplicationTests {
	
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	@Value("${app.jwtExpirationInMs}")
	private String jwtExpirationInMs;
	
	@Test
	public void contextLoads() {
		String psd = "thswnsgjs";
		String encPsd = null;
		
		encPsd = encoder.encode(psd);
		
		System.out.println(encPsd );
		
		System.out.println(jwtExpirationInMs);
		
		Date now = new Date();
		System.out.println(now);
		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
		System.out.println(expiryDate);
		
	}

}
