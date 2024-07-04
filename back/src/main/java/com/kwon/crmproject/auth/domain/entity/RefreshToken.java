package com.kwon.crmproject.auth.domain.entity;

import com.kwon.crmproject.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RefreshToken extends BaseEntity {

    private String token;

    public RefreshToken(String token) {
        this.token = token;
    }
}
