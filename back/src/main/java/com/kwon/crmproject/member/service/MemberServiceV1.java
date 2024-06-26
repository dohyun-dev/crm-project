package com.kwon.crmproject.member.service;

import com.kwon.crmproject.member.domain.entity.Member;
import com.kwon.crmproject.member.dto.MemberRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberServiceV1 {
    Member findDetail(Long memberId);
    Page<Member> findAll(MemberRequest.SearchCondition searchCondition, Pageable pageable);
    void create(MemberRequest.Command request);
    void edit(Long memberId, MemberRequest.Command request);
    void delete(Long memberId);
}
