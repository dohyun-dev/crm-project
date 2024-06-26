package com.kwon.crmproject.common.dto;

import lombok.Data;

import java.util.Map;

@Data
public class ValidationErrorResponse {
    private ResponseType type = ResponseType.VALIDATION_ERROR;
    private Map<String, String> errors;

    public ValidationErrorResponse(Map<String, String> errors) {
        this.errors = errors;
    }
}
