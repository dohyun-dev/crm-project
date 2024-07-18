package com.kwon.crmproject.auth.filter;

import com.kwon.crmproject.auth.dto.AuthServiceDto;
import com.kwon.crmproject.auth.service.AuthServiceV1;
import com.kwon.crmproject.auth.util.JWTUtil;
import com.kwon.crmproject.auth.util.TokenType;
import com.kwon.crmproject.common.exception.CustomException;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String ROLE_PREFIX = "ROLE_";
    private final JWTUtil jwtUtil;
    private final AuthServiceV1 authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (authApiIgnore(request, response, filterChain)) return;

        Optional<Claims> accessTokenClaims = getAccessTokenClaims(request);

        if (isValidAccessToken(accessTokenClaims)) {
            setAuthentication(accessTokenClaims.get());
        } else {
            handleTokenReissueOrDeny(request, response);
        }

        filterChain.doFilter(request, response);
    }

    private boolean authApiIgnore(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        if (request.getRequestURI().startsWith("/api/v1/auth/")) {
            filterChain.doFilter(request, response);
            return true;
        }
        return false;
    }

    private Optional<Claims> getAccessTokenClaims(HttpServletRequest request) {
        try {
            String accessToken = jwtUtil.findTokenInCookies(TokenType.ACCESS_TOKEN, request);
            return jwtUtil.validateAndExtractToken(accessToken);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private boolean isValidAccessToken(Optional<Claims> accessTokenClaims) {
        return accessTokenClaims.isPresent();
    }

    private String getRefreshToken(HttpServletRequest request) {
        String refreshToken = jwtUtil.findTokenInCookies(TokenType.REFRESH_TOKEN, request);
        try {
            jwtUtil.validateAndExtractToken(refreshToken);
            return refreshToken;
        } catch (Exception e) {
            return null;
        }
    }

    private boolean isValidRefreshToken(String refreshToken) {
        return !ObjectUtils.isEmpty(refreshToken);
    }

    private void denyAccess(HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

    private void reissueToken(String refreshToken, HttpServletResponse response) {
        try {
            AuthServiceDto.TokenDto tokenDto = authService.reissue(refreshToken);
            jwtUtil.setTokenInCookies(tokenDto, response);
            Claims claims = jwtUtil.validateAndExtractToken(tokenDto.accessToken()).orElseThrow();
            setAuthentication(claims);
        } catch (CustomException e) {
            log.error("{}", e);
        }
    }

    private void handleTokenReissueOrDeny(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = getRefreshToken(request);
        if (isValidRefreshToken(refreshToken)) {
            reissueToken(refreshToken, response);
        } else {
            denyAccess(response);
        }
    }

    private void setAuthentication(Claims claims) {
        String username = claims.getSubject();
        String role = claims.get(JWTUtil.CLAIMS_ROLE_NAME, String.class);

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                username,
                null,
                Collections.singletonList(new SimpleGrantedAuthority(ROLE_PREFIX + role))
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
