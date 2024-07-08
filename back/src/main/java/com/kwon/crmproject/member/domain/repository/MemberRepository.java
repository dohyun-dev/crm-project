package com.kwon.crmproject.member.domain.repository;

import com.kwon.crmproject.member.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByName(String name);
    Optional<Member> findByNameContaining(String name);
    Optional<Member> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByName(String name);
}