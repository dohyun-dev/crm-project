package com.kwon.crmproject.auth.dto;

import com.kwon.crmproject.member.domain.entity.Member;
import lombok.Data;

@Data
public abstract class AuthServiceDto {

    public record Login(Member loginMember, TokenDto tokenDto) {
    }

    public record TokenDto(String accessToken, String refreshToken) {

    }
}
