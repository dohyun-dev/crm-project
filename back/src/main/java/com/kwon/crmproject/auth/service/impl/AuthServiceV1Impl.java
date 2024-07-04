package com.kwon.crmproject.auth.service.impl;

import com.kwon.crmproject.auth.domain.entity.RefreshToken;
import com.kwon.crmproject.auth.domain.repository.RefreshTokenRepository;
import com.kwon.crmproject.auth.dto.AuthServiceDto;
import com.kwon.crmproject.auth.service.AuthServiceV1;
import com.kwon.crmproject.auth.util.JWTUtil;
import com.kwon.crmproject.common.exception.CustomException;
import com.kwon.crmproject.common.exception.ErrorType;
import com.kwon.crmproject.member.domain.entity.Member;
import com.kwon.crmproject.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceV1Impl implements AuthServiceV1 {

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    @Transactional
    @Override
    public AuthServiceDto.Login login(String username, String password) {
        Member findMember = memberRepository.findByUsername(username)
                .orElseThrow(() -> CustomException.of(ErrorType.LOGIN_FAILURE));

        if (!passwordEncoder.matches(password, findMember.getPassword()))
            throw CustomException.of(ErrorType.LOGIN_FAILURE);

        AuthServiceDto.TokenDto tokenDto = new AuthServiceDto.TokenDto(
                jwtUtil.generateAccessToken(findMember.getUsername()),
                jwtUtil.generateRefreshToken()
        );

        refreshTokenRepository.save(new RefreshToken(tokenDto.refreshToken()));

        return new AuthServiceDto.Login(
                findMember,
                tokenDto
        );
    }
}
