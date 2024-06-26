package com.kwon.crmproject.common.handler;

import com.kwon.crmproject.common.dto.ErrorResponse;
import com.kwon.crmproject.common.dto.ValidationErrorResponse;
import com.kwon.crmproject.common.exception.CustomException;
import com.kwon.crmproject.common.exception.ErrorType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
@RequiredArgsConstructor
@Slf4j
public class DefaultExceptionHandler {

    private final MessageSource messageSource;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> defaultExceptionHandler(Exception exception) {
        log.error("{}", exception);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(CustomException.of(ErrorType.INTERNAL_SERVER_ERROR)));
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customExceptionHandler(CustomException customException, HttpServletRequest request) {
        return ResponseEntity
                .status(customException.getErrorType().getHttpStatus())
                .body(ErrorResponse.of(customException));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exception) {
        
        Map<String, String> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField, e -> getErrorMessage(e)));

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ValidationErrorResponse(errors));
    }


    private String getErrorMessage(FieldError error) {
		String[] codes = error.getCodes();
		for (String code : codes) {
			try {
				return messageSource.getMessage(code, error.getArguments(), Locale.KOREA);
			} catch (NoSuchMessageException ignored) {}
		}
		return error.getDefaultMessage();
	}

}
