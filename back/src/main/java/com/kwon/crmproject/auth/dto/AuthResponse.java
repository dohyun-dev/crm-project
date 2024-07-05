package com.kwon.crmproject.auth.dto;

import lombok.Data;

public abstract class AuthResponse {

    @Data
    public static class TokenDto {
        private final String accessToken;

        public TokenDto(String accessToken) {
            this.accessToken = accessToken;
        }
    }
}
