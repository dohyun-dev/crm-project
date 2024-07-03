package com.kwon.crmproject.member.domain.entity;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.common.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreRemove;
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
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campaign> campaigns = new ArrayList<>();

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
            String email, String contact, String accountHolder
    ) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.email = email;
        this.contact = contact;
        this.accountHolder = accountHolder;
    }

    @PreRemove
    private void preRemove() {
        for (Campaign campaign : campaigns) {
            campaign.removeMember();
        }
    }
}
