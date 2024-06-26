package com.kwon.crmproject.member.domain.entity;

import com.kwon.crmproject.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member extends BaseEntity {

    private String companyName;
    private String username;
    private String password;
    private String businessRegistrationNumber;
    private String email;
    private String contact;
    private String accountHolder;

    @Builder
    public Member(
            Long id, String companyName, String username,
            String password, String businessRegistrationNumber,
            String email, String contact, String accountHolder
    ) {
        super(id);
        this.companyName = companyName;
        this.username = username;
        this.password = password;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.email = email;
        this.contact = contact;
        this.accountHolder = accountHolder;
    }

    public void update(
            String companyName, String username,
            String password, String businessRegistrationNumber,
            String email, String contact, String accountHolder
    ) {
        this.companyName = companyName;
        this.username = username;
        this.password = password;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.email = email;
        this.contact = contact;
        this.accountHolder = accountHolder;
    }
}
