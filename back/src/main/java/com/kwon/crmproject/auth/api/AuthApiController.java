package com.kwon.crmproject.auth.api;

import com.kwon.crmproject.auth.dto.AuthRequest;
import com.kwon.crmproject.auth.dto.AuthResponse;
import com.kwon.crmproject.auth.dto.AuthServiceDto;
import com.kwon.crmproject.auth.service.AuthServiceV1;
import com.kwon.crmproject.auth.util.JWTProperties;
import com.kwon.crmproject.auth.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthApiController {

    private final AuthServiceV1 authService;
    private final JWTProperties jwtProperties;

    @PostMapping("/login")
    public AuthResponse.Login login(@RequestBody AuthRequest.Login request, HttpServletResponse response) {
        AuthServiceDto.Login login = authService.login(request.getUsername(), request.getPassword());

        setTokenInCookie(
                response,
                login.tokenDto().accessToken(),
                login.tokenDto().refreshToken()
        );

        return new AuthResponse.Login(login.loginMember());
    }

    private void setTokenInCookie(HttpServletResponse response, String accessToken, String refreshToken) {
        Cookie accessTokenCookie = new Cookie(jwtProperties.ACCESS_TOKEN_HEADER, accessToken);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge((int) jwtProperties.ACCESS_TOKEN_EXPIRATION_TIME / 1000);

        Cookie refreshTokenCookie = new Cookie(jwtProperties.REFRESH_TOKEN_HEADER, refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge((int) jwtProperties.REFRESH_TOKEN_EXPIRATION_TIME / 1000);

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);
    }
}
