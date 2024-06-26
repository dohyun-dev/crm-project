package com.kwon.crmproject.common.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final ErrorType errorType;

    private CustomException(ErrorType errorType) {
        super(errorType.getMessage());
        this.errorType = errorType;
    }

    public static CustomException of(ErrorType errorType) {
        return new CustomException(errorType);
    }
}
