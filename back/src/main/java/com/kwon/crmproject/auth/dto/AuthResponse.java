package com.kwon.crmproject.auth.dto;

import com.kwon.crmproject.member.domain.entity.Member;
import com.kwon.crmproject.member.domain.entity.MemberRole;
import lombok.Data;

public abstract class AuthResponse {

    @Data
    public static class Login {
        private final Long memberId;
        private final String memberName;
        private final MemberRole role;

        public Login(Member member) {
            this.memberId = member.getId();
            this.memberName = member.getName();
            this.role = member.getRole();
        }
    }
}
