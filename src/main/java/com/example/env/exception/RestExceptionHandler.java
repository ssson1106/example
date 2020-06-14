package com.example.env.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.annotation.ResponseStatusExceptionResolver;

@RestControllerAdvice
public class RestExceptionHandler {

	@ExceptionHandler(UnAuthorizedException.class)
	protected ModelAndView handleUnAuthorizedException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		
		// 응답헤더에 WWW-Authenticate를 추가
        response.setHeader("WWW-Authenticate", "Basic realm=\"Access to user information\"");

        // ResponseStatusExceptionResolver를 통해 exception을 응답 모델로 변경
        return new ResponseStatusExceptionResolver()
            .resolveException(request, response, handler, ex);
	}
}
