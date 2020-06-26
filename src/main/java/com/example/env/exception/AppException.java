package com.example.env.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AppException extends RuntimeException{

	private static final long serialVersionUID = -7592188523024046972L;

	public AppException(String message) {
		super(message);
	}
	
	public AppException(String message, Throwable t) {
		super(message, t);
	}
}
