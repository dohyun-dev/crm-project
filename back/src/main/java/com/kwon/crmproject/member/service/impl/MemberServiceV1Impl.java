package com.kwon.crmproject.member.service.impl;

import com.kwon.crmproject.common.exception.CustomException;
import com.kwon.crmproject.common.exception.ErrorType;
import com.kwon.crmproject.member.domain.entity.Member;
import com.kwon.crmproject.member.domain.repository.MemberRepository;
import com.kwon.crmproject.member.dto.MemberRequest;
import com.kwon.crmproject.member.service.MemberServiceV1;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberServiceV1Impl implements MemberServiceV1 {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Member findDetail(Long memberId) {
        return getMember(memberId);
    }

    @Override
    public Page<Member> findAll(MemberRequest.SearchCondition searchCondition, Pageable pageable) {
        Member exampleMember = Member.builder()
                .name(searchCondition.name())
                .build();

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        Example<Member> example = Example.of(exampleMember, matcher);

        return memberRepository.findAll(example, pageable);
    }

    @Transactional
    @Override
    public void create(MemberRequest.Command request) {
        validateParam(request);

        Member newMember = Member.builder()
                .name(request.getName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .businessRegistrationNumber(request.getBusinessRegistrationNumber())
                .email(request.getEmail())
                .contact(request.getContact())
                .accountHolder(request.getAccountHolder())
                .build();

        memberRepository.save(newMember);
    }

    @Transactional
    @Override
    public void edit(Long memberId, MemberRequest.Command request) {
        Member findMember = getMember(memberId);

        String encodedPassword = getCurrentOrNewEncodedPassword(request.getPassword(), findMember.getPassword());

        findMember.update(
                request.getName(),
                request.getUsername(),
                encodedPassword,
                request.getBusinessRegistrationNumber(),
                request.getEmail(),
                request.getContact(),
                request.getAccountHolder()
        );
    }
    @Override
    public void delete(Long memberId) {
        Member findMember = getMember(memberId);

        memberRepository.delete(findMember);
    }

    private Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> CustomException.of(ErrorType.MEMBER_NOT_FOUND));
    }

    private String getCurrentOrNewEncodedPassword(String inputPassword, String curPassword) {
        if (inputPassword.equals(curPassword)) {
            return curPassword;
        }
        return passwordEncoder.encode(inputPassword);
    }

    private void validateParam(MemberRequest.Command request) {
        if (memberRepository.existsByUsername(request.getUsername()))
            throw CustomException.of(ErrorType.USERNAME_DUPLICATED);
    }
}
