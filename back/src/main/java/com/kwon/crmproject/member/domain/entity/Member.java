package com.kwon.crmproject.member.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kwon.crmproject.auth.domain.entity.RefreshToken;
import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member extends BaseEntity {

    private String name;
    private String username;
    private String password;
    private String businessRegistrationNumber;
    private String email;
    private String contact;
    private String accountHolder;

    @JsonManagedReference
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campaign> campaigns = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RefreshToken> refreshToken = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Builder
    public Member(
            Long id, String name, String username,
            String password, String businessRegistrationNumber,
            String email, String contact, String accountHolder
    ) {
        super(id);
        this.name = name;
        this.username = username;
        this.password = password;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.email = email;
        this.contact = contact;
        this.accountHolder = accountHolder;
    }

    public void update(
            String name, String username,
            String password, String businessRegistrationNumber,
            String email, String contact, String accountHolder,
            MemberRole role
    ) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.email = email;
        this.contact = contact;
        this.accountHolder = accountHolder;
        this.role = role;
    }

    public void setRefreshToken(RefreshToken refreshToken) {
        this.refreshToken.add(refreshToken);
        refreshToken.setMember(this);
    }

    public void removeRefreshToken() {
        if (refreshToken == null)
            return;
        refreshToken.forEach((r) -> r.removeMember());
        refreshToken.clear();
    }

    @PrePersist
    protected void onCreate() {
        if (this.role == null) {
            this.role = MemberRole.USER;
        }
    }

    @PreRemove
    private void preRemove() {
        campaigns.forEach((c) -> c.removeMember());
        removeRefreshToken();
    }

    public boolean isAdmin() {
        return this.role.equals(MemberRole.ADMIN);
    }
}
