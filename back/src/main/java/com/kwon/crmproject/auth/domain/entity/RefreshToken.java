package com.kwon.crmproject.auth.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kwon.crmproject.common.entity.BaseEntity;
import com.kwon.crmproject.member.domain.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RefreshToken extends BaseEntity {

    private String token;

    @JsonBackReference
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public RefreshToken(String token, Member member) {
        this.token = token;
        this.member = member;
    }

    public void removeMember() {
        this.member = null;
    }
}
