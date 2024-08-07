package com.kwon.crmproject.auth.domain.repository;

import com.kwon.crmproject.auth.domain.entity.RefreshToken;
import com.kwon.crmproject.member.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    List<RefreshToken> findByMember(Member member);
}
