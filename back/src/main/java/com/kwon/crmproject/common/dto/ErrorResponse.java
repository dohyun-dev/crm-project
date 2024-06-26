package com.kwon.crmproject.common.dto;

import com.kwon.crmproject.common.exception.CustomException;
import lombok.Data;

@Data
public class ErrorResponse {

    private ResponseType type = ResponseType.ERROR;
    private String description;

    private ErrorResponse(String description) {
        this.description = description;
    }

    public static ErrorResponse of(CustomException exception) {
        return new ErrorResponse(exception.getErrorType().getMessage());
    }
}
