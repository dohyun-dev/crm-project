package com.kwon.crmproject.common.dto;

import lombok.Data;

@Data
public class ApiResponse<T> {
    private ResponseType type = ResponseType.SUCESS;
    private T data;

    public ApiResponse(T data) {
        this.data = data;
    }
}
