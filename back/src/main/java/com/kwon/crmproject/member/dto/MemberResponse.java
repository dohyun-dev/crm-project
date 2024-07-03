package com.kwon.crmproject.member.dto;

import com.kwon.crmproject.member.domain.entity.Member;
import lombok.Data;

import java.time.LocalDateTime;

public abstract class MemberResponse {

    @Data
    public static class FindAll {
        private Long id;
        private String name;
        private String username;
        private String businessRegistrationNumber;
        private String email;
        private String contact;
        private String accountHolder;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public FindAll(Member member) {
            this.id = member.getId();
            this.name = member.getName();
            this.username = member.getUsername();
            this.businessRegistrationNumber = member.getBusinessRegistrationNumber();
            this.email = member.getEmail();
            this.contact = member.getContact();
            this.accountHolder = member.getAccountHolder();
            this.createdAt = member.getCreatedAt();
            this.updatedAt = member.getUpdatedAt();
        }
    }
}
