package com.app.exc_handler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;

@RestControllerAdvice 
public class GlobalExceptionHandler {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException
	(MethodArgumentNotValidException e)
	{
		List<FieldError> errList=e.getFieldErrors();

		Map<String, String> map = errList.stream() 
		.collect(
				Collectors.toMap(FieldError::getField,FieldError::getDefaultMessage));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException
	(ResourceNotFoundException e){
		return ResponseEntity.notFound().build();
			
	}
	
	
		@ExceptionHandler(Exception.class)
		public ResponseEntity<?> handleException
		(Exception e){
			e.printStackTrace();
			return ResponseEntity.status
					(HttpStatus.INTERNAL_SERVER_ERROR).
					body(new ApiResponse(e.getMessage()));
		}
	

}
