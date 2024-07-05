package com.kwon.crmproject.auth.api;

import com.kwon.crmproject.auth.dto.AuthRequest;
import com.kwon.crmproject.auth.dto.AuthResponse;
import com.kwon.crmproject.auth.dto.AuthServiceDto;
import com.kwon.crmproject.auth.service.AuthServiceV1;
import com.kwon.crmproject.auth.util.JWTProperties;
import com.kwon.crmproject.common.exception.CustomException;
import com.kwon.crmproject.common.exception.ErrorType;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthApiController {

    private final AuthServiceV1 authService;
    private final JWTProperties jwtProperties;

    @PostMapping("/login")
    public AuthResponse.TokenDto login(@RequestBody AuthRequest.Login request, HttpServletResponse response) {
        AuthServiceDto.Login loginDto = authService.login(request.getUsername(), request.getPassword());
        setRefreshTokenInCookies(loginDto.tokenDto().refreshToken(), response);
        return new AuthResponse.TokenDto(loginDto.tokenDto().accessToken());
    }

    @PostMapping("/reissue")
    public AuthResponse.TokenDto reissue(HttpServletRequest request, HttpServletResponse response) {
        Optional<Cookie> optionalRefreshTokenCookie = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals(jwtProperties.REFRESH_TOKEN_COOKIE_NAME))
                .findFirst();

        if (!optionalRefreshTokenCookie.isPresent())
            throw CustomException.of(ErrorType.TOKEN_EXPIRED);

        AuthServiceDto.TokenDto tokenDto = authService.reissue(optionalRefreshTokenCookie.get().getValue());

        setRefreshTokenInCookies(tokenDto.refreshToken(), response);

        return new AuthResponse.TokenDto(tokenDto.accessToken());
    }

    private void setRefreshTokenInCookies(String refreshToken, HttpServletResponse response) {
        Cookie refreshTokenCookie = new Cookie(jwtProperties.REFRESH_TOKEN_COOKIE_NAME, refreshToken);
        // refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge((int) jwtProperties.REFRESH_TOKEN_EXPIRATION_TIME / 1000);
        response.addCookie(refreshTokenCookie);
    }
}
