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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
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

        refreshTokenRepository.findByMember(findMember).forEach(r -> refreshTokenRepository.delete(r));

        if (!passwordEncoder.matches(password, findMember.getPassword()))
            throw CustomException.of(ErrorType.LOGIN_FAILURE);

        AuthServiceDto.TokenDto tokenDto = createAndSaveToken(
                findMember
        );

        return new AuthServiceDto.Login(
                findMember,
                tokenDto
        );
    }

    @Transactional
    @Override
    public AuthServiceDto.TokenDto reissue(String refreshToken) {
        RefreshToken refreshTokenEntity = findRefreshToken(refreshToken);

        jwtUtil.validateAndExtractToken(refreshToken)
                .orElseThrow(() -> CustomException.of(ErrorType.TOKEN_EXPIRED));

        AuthServiceDto.TokenDto tokenDto = createAndSaveToken(refreshTokenEntity.getMember());

        return tokenDto;
    }

    @Transactional
    @Override
    public void logout(String refreshToken) {
        RefreshToken refreshTokenEntity = findRefreshToken(refreshToken);
        refreshTokenRepository.delete(refreshTokenEntity);
    }

    private RefreshToken findRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> CustomException.of(ErrorType.TOKEN_EXPIRED));
    }

    private AuthServiceDto.TokenDto createAndSaveToken(Member member) {
        member.removeRefreshToken();

        AuthServiceDto.TokenDto tokenDto = new AuthServiceDto.TokenDto(
                jwtUtil.generateAccessToken(member.getId(), member.getUsername(), member.getName(), member.getRole()),
                jwtUtil.generateRefreshToken()
        );

        RefreshToken refreshToken = new RefreshToken(tokenDto.refreshToken(), member);
        refreshTokenRepository.save(refreshToken);
        return tokenDto;
    }
}