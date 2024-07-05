package com.kwon.crmproject.auth.util;

import com.kwon.crmproject.member.domain.entity.MemberRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@Component
@Slf4j
public class JWTUtil {

    public static final String CLAIMS_ROLE_NAME = "role";
    public static final String CLAIMS_MEMBER_NAME_NAME = "memberName";
    private final SecretKey secretKey;
    private final JWTProperties properties;

    public JWTUtil(JWTProperties properties) {
         this.secretKey = Keys.hmacShaKeyFor(properties.SECRET_KEY.getBytes());
         this.properties = properties;
    }

    public String generateAccessToken(String username, String memberName, MemberRole role) {
        return generateToken(username, memberName, role.name(), properties.ACCESS_TOKEN_EXPIRATION_TIME);
    }

    public String generateRefreshToken() {
        return generateToken(null, null, null, properties.REFRESH_TOKEN_EXPIRATION_TIME);
    }

    public Optional<Claims> validateAndExtractToken(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        } catch (Exception e) {
            log.error("잘못된 토큰");
        }
        return Optional.ofNullable(claims);
    }

    private String generateToken(String username, String memberName, String role, long expirationTime) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .claim(CLAIMS_MEMBER_NAME_NAME, memberName)
                .claim(CLAIMS_ROLE_NAME, role)
                .compact();
    }
}