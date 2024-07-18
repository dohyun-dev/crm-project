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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @Builder
    public RefreshToken(String token, Member member) {
        this.token = token;
        this.member = member;
        member.setRefreshToken(this);
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void removeMember() {
        this.member = null;
    }
}
