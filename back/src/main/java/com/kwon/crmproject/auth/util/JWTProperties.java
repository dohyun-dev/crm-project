package com.kwon.crmproject.auth.util;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class JWTProperties {
    public final String ACCESS_TOKEN_HEADER = "accessToken";

    public final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    public final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    public final String SECRET_KEY;

    public final long ACCESS_TOKEN_EXPIRATION_TIME;

    public final long REFRESH_TOKEN_EXPIRATION_TIME;

    public JWTProperties(
            @Value("${jwt.secretKey}") String secretKey,
            @Value("${jwt.accessTokenExpirationTime}") long ACCESS_TOKEN_EXPIRATION_MINUTE,
            @Value("${jwt.refreshTokenExpirationTime}") long REFRESH_TOKEN_EXPIRATION_MINUTE
    ) {
        this.SECRET_KEY = secretKey;
        this.ACCESS_TOKEN_EXPIRATION_TIME = ACCESS_TOKEN_EXPIRATION_MINUTE * 60 * 1000L;
        this.REFRESH_TOKEN_EXPIRATION_TIME = REFRESH_TOKEN_EXPIRATION_MINUTE * 60 * 1000L;
    }

    public String getTokenCookieName(TokenType tokenType) {
        switch (tokenType) {
            case REFRESH_TOKEN -> {
                return REFRESH_TOKEN_COOKIE_NAME;
            }
            case ACCESS_TOKEN -> {
                return ACCESS_TOKEN_COOKIE_NAME;
            }
        }
        return null;
    }

    public long getExpirationSeconds(TokenType tokenType) {
        switch (tokenType) {
            case REFRESH_TOKEN -> {
                return REFRESH_TOKEN_EXPIRATION_TIME;
            }
            case ACCESS_TOKEN -> {
                return ACCESS_TOKEN_EXPIRATION_TIME;
            }
        }
        return 0;
    }
}
