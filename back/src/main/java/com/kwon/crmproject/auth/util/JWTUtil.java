package com.kwon.crmproject.auth.util;

import com.kwon.crmproject.auth.dto.AuthServiceDto;
import com.kwon.crmproject.common.exception.CustomException;
import com.kwon.crmproject.common.exception.ErrorType;
import com.kwon.crmproject.member.domain.entity.MemberRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
@Slf4j
public class JWTUtil {

    public static final String CLAIMS_MEMBER_ID_NAME = "memberId";
    public static final String CLAIMS_MEMBER_NAME_NAME = "memberName";
    public static final String CLAIMS_ROLE_NAME = "role";
    private final SecretKey secretKey;
    private final JWTProperties properties;

    public JWTUtil(JWTProperties properties) {
        this.secretKey = Keys.hmacShaKeyFor(properties.getSECRET_KEY().getBytes());
        this.properties = properties;
    }

    public String generateAccessToken(Long memberId, String username, String memberName, MemberRole role) {
        return generateToken(
                memberId,
                username,
                memberName,
                role.name(),
                properties.getExpirationSeconds(TokenType.ACCESS_TOKEN)
        );
    }

    public String generateRefreshToken() {
        return generateToken(
                null,
                null,
                null,
                null,
                properties.getExpirationSeconds(TokenType.REFRESH_TOKEN)
        );
    }

    public Optional<Claims> validateAndExtractToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return Optional.of(claims);
        } catch (ExpiredJwtException e) {
            log.error("토큰이 만료되었습니다: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 토큰입니다: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("잘못된 토큰입니다: {}", e.getMessage());
        } catch (SignatureException e) {
            log.error("토큰 서명 검증 실패: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("토큰이 비어있거나 잘못되었습니다: {}", e.getMessage());
        } catch (Exception e) {
            log.error("토큰 검증 중 알 수 없는 오류 발생: {}", e.getMessage());
        }
        return Optional.empty();
    }

    public String findTokenInCookies(TokenType tokenType, HttpServletRequest request) {
        Cookie[] cookiesArray = request.getCookies();

        if (cookiesArray == null) {
            throw CustomException.of(ErrorType.TOKEN_EXPIRED);
        }

        List<Cookie> cookies = Arrays.stream(cookiesArray)
                .filter(c -> c.getName().equals(properties.getTokenCookieName(tokenType)))
                .toList();

        if (cookies.isEmpty()) {
            throw CustomException.of(ErrorType.TOKEN_EXPIRED);
        }

        return cookies.get(0).getValue();
    }

    private String generateToken(Long memberId, String username, String memberName, String role, long expirationTime) {
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(System.currentTimeMillis() + expirationTime);

        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey, SignatureAlgorithm.HS256);

        if (memberId != null) {
            jwtBuilder.claim(CLAIMS_MEMBER_ID_NAME, memberId);
        }
        if (memberName != null) {
            jwtBuilder.claim(CLAIMS_MEMBER_NAME_NAME, memberName);
        }
        if (role != null) {
            jwtBuilder.claim(CLAIMS_ROLE_NAME, role);
        }
        return jwtBuilder.compact();
    }

    public void setTokenInCookies(AuthServiceDto.TokenDto tokenDto, HttpServletResponse response) {
        setCookie(
                TokenType.ACCESS_TOKEN,
                tokenDto.accessToken(),
                response
        );

        setCookie(
                TokenType.REFRESH_TOKEN,
                tokenDto.refreshToken(),
                response
        );
    }

    public void removeTokenInCookies(HttpServletResponse response) {
        removeCookie(
                TokenType.ACCESS_TOKEN,
                response
        );

        removeCookie(
                TokenType.REFRESH_TOKEN,
                response
        );
    }

    private void setCookie(TokenType tokenType, String value, HttpServletResponse response) {
        Cookie tokenCookie = new Cookie(properties.getTokenCookieName(tokenType), value);
        tokenCookie.setHttpOnly(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge((int) (properties.getExpirationSeconds(tokenType)));
        response.addCookie(tokenCookie);
    }

    private void removeCookie(TokenType tokenType, HttpServletResponse response) {
        Cookie tokenCookie = new Cookie(properties.getTokenCookieName(tokenType), null);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(0);
        response.addCookie(tokenCookie);
    }
}
