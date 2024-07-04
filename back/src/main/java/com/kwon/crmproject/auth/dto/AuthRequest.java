package com.kwon.crmproject.auth.dto;

import lombok.Data;

public abstract class AuthRequest {

    @Data
    public static class Login {
        private String username;
        private String password;
    }
}
