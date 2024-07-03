package com.kwon.crmproject.member.api;

import com.kwon.crmproject.member.domain.entity.Member;
import com.kwon.crmproject.member.dto.MemberRequest;
import com.kwon.crmproject.member.dto.MemberResponse;
import com.kwon.crmproject.member.service.MemberServiceV1;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberApiControllerV1 {

    private final MemberServiceV1 memberService;

    @GetMapping("/{memberId}")
    public Member findDetail(@PathVariable("memberId") Long memberId) {
        return memberService.findDetail(memberId);
    }

    @GetMapping
    public Page<MemberResponse.FindAll> findAll(MemberRequest.SearchCondition searchCondition, Pageable pageable) {
        return memberService.findAll(searchCondition, pageable).map(MemberResponse.FindAll::new);
    }

    @PostMapping
    public void create(@Valid @RequestBody MemberRequest.Command request) {
        memberService.create(request);
    }

    @PutMapping("/{memberId}")
    public void edit(
            @PathVariable("memberId") Long memberId,
            @Valid @RequestBody MemberRequest.Command request
    ) {
        memberService.edit(memberId, request);
    }

    @DeleteMapping("/{memberId}")
    public void delete(
            @PathVariable("memberId") Long memberId
    ) {
        memberService.delete(memberId);
    }
}
