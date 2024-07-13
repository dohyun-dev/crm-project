package com.kwon.crmproject.common.config;

import com.kwon.crmproject.member.domain.entity.Member;
import com.kwon.crmproject.member.domain.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

// @Configuration
@RequiredArgsConstructor
public class CreateAdminConfig {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        Member admin = Member.builder()
                .name("관리자")
                .username("admin")
                .password(passwordEncoder.encode("admin1234"))
                .build();
        memberRepository.save(admin);
    }
}
