package com.kwon.crmproject.campaign.domain.entity;

import com.kwon.crmproject.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Campaign extends BaseEntity {

    private String keyword;

    private String companyName;

    private String url;

    private String mid;

    private LocalDate startDate;

    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private CampaignState state;

    @Enumerated(EnumType.STRING)
    private CampaignRewardType rewardType;

    private Integer trafficRequest;

    @Builder
    public Campaign(
            Long id, String keyword, String companyName,
            String url, String mid, LocalDate startDate, LocalDate endDate,
            CampaignState state, CampaignRewardType rewardType, Integer trafficRequest
    ) {
        super(id);
        this.keyword = keyword;
        this.companyName = companyName;
        this.url = url;
        this.mid = mid;
        this.startDate = startDate;
        this.endDate = endDate;
        this.state = state;
        this.rewardType = rewardType;
        this.trafficRequest = trafficRequest;
    }

    public void update(
            String keyword, String companyName,
            String url, String mid, LocalDate startDate, LocalDate endDate,
            CampaignRewardType rewardType, Integer trafficRequest, CampaignState state
    ) {
        this.keyword = keyword;
        this.companyName = companyName;
        this.url = url;
        this.mid = mid;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rewardType = rewardType;
        this.trafficRequest = trafficRequest;
        this.state = state;
    }
}
