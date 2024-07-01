package com.kwon.crmproject.member.domain.repository;

import com.kwon.crmproject.member.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByName(String name);
    boolean existsByUsername(String username);
    boolean existsByName(String name);
}