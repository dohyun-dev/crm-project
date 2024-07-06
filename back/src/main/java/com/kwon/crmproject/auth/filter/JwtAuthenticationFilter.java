package com.kwon.crmproject.auth.filter;

import com.kwon.crmproject.auth.util.JWTUtil;
import com.kwon.crmproject.member.domain.entity.Member;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private static final String TOKEN_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // 헤더 검증
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            log.info("헤더 검증 실패");
            filterChain.doFilter(request, response);
            return;
        }
        log.info("헤더 검증 완료");

        String token = header.substring(7);

        // 토큰 검증
        Optional<Claims> optionalClaims = jwtUtil.validateAndExtractToken(token);

        System.out.println("토큰 검증 완료");
        if (optionalClaims.isPresent()) {
            Claims claims = optionalClaims.get();

            String username = claims.getSubject();
            String role = claims.get(JWTUtil.CLAIMS_ROLE_NAME, String.class);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority(role))
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            SecurityContextHolder.getContext();
            log.info("인증 정보 등록 {}", SecurityContextHolder.getContext());
        }

        filterChain.doFilter(request, response);
    }
}
