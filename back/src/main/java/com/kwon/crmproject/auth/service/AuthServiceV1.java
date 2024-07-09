package com.kwon.crmproject.auth.service;

import com.kwon.crmproject.auth.dto.AuthServiceDto;

public interface AuthServiceV1 {
    AuthServiceDto.Login login(String username, String password);
    AuthServiceDto.TokenDto reissue(String refreshToken);
    void logout(String refreshToken);
}
