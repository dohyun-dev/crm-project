package com.kwon.crmproject.auth.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JWTUtil {
  
    private final SecretKey secretKey;
    private final JWTProperties properties;

    public JWTUtil(JWTProperties properties) {
         this.secretKey = Keys.hmacShaKeyFor(properties.SECRET_KEY.getBytes());
         this.properties = properties;
    }

    public String generateAccessToken(String username) {
        return generateToken(username, properties.ACCESS_TOKEN_EXPIRATION_TIME);
    }

    public String generateRefreshToken() {
        return generateToken(null, properties.REFRESH_TOKEN_EXPIRATION_TIME);
    }

    private String generateToken(String username, long expirationTime) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }
}