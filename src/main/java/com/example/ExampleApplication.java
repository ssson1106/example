package com.example;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication
@EntityScan(basePackageClasses = {ExampleApplication.class, Jsr310JpaConverters.class})
public class ExampleApplication {
	
	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("Seoul/Asia"));
	}
	
	public static void main(String[] args) {
		SpringApplication.run(ExampleApplication.class, args);
	}

}
