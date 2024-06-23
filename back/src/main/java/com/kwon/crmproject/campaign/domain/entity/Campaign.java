package com.kwon.crmproject.campaign.domain.entity;

import com.kwon.crmproject.common.entity.BaseTimeEntity;
import com.kwon.crmproject.member.domain.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Campaign extends BaseTimeEntity {

    private String keyword;

    private String companyName;

    private String url;

    private String mid;

    private LocalDate startDate;

    private LocalDate endDate;

    private String email;

    private String contact;

    private String accountHolder;

    @Enumerated(EnumType.STRING)
    private CampaignState state;

    @Enumerated(EnumType.STRING)
    private CampaignRewardType rewardType;

    private String trafficRequest;

    @Builder
    public Campaign(
            Long id, String keyword, String companyName,
            String url, String mid, LocalDate startDate, LocalDate endDate,
            String email, String contact, String accountHolder,
            CampaignState state, CampaignRewardType rewardType, String trafficRequest
    ) {
        super(id);
        this.keyword = keyword;
        this.companyName = companyName;
        this.url = url;
        this.mid = mid;
        this.startDate = startDate;
        this.endDate = endDate;
        this.email = email;
        this.contact = contact;
        this.accountHolder = accountHolder;
        this.state = state;
        this.rewardType = rewardType;
        this.trafficRequest = trafficRequest;
    }
}
