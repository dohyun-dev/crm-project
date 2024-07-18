package com.kwon.crmproject.auth.api;

import com.kwon.crmproject.auth.dto.AuthRequest;
import com.kwon.crmproject.auth.dto.AuthResponse;
import com.kwon.crmproject.auth.dto.AuthServiceDto;
import com.kwon.crmproject.auth.service.AuthServiceV1;
import com.kwon.crmproject.auth.util.JWTProperties;
import com.kwon.crmproject.auth.util.JWTUtil;
import com.kwon.crmproject.auth.util.TokenType;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthApiControllerV1 {

    private final AuthServiceV1 authService;
    private final JWTUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse.TokenDto login(@RequestBody AuthRequest.Login request, HttpServletResponse response) {
        log.info("{}", request);
        AuthServiceDto.Login loginDto = authService.login(request.getUsername(), request.getPassword());
        jwtUtil.setTokenInCookies(loginDto.tokenDto(), response);
        return new AuthResponse.TokenDto(loginDto.tokenDto().accessToken());
    }

    @PostMapping("/reissue")
    public AuthResponse.TokenDto reissue(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtUtil.findTokenInCookies(TokenType.REFRESH_TOKEN, request);
        AuthServiceDto.TokenDto tokenDto = authService.reissue(refreshToken);
        jwtUtil.setTokenInCookies(tokenDto, response);
        return new AuthResponse.TokenDto(tokenDto.accessToken());
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtUtil.findTokenInCookies(TokenType.REFRESH_TOKEN, request);
        authService.logout(refreshToken);
        jwtUtil.removeTokenInCookies(response);
    }
}
