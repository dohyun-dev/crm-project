package com.kwon.crmproject.campaign.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kwon.crmproject.common.entity.BaseEntity;
import com.kwon.crmproject.common.exception.CustomException;
import com.kwon.crmproject.common.exception.ErrorType;
import com.kwon.crmproject.member.domain.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.ObjectUtils;

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

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @Builder
    public Campaign(
            Long id, String keyword, String companyName,
            String url, String mid, LocalDate startDate, LocalDate endDate,
            CampaignState state, CampaignRewardType rewardType, Integer trafficRequest,
            Member member
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
        this.member = member;
    }

    public void update(
            String keyword, String companyName,
            String url, String mid, LocalDate startDate, LocalDate endDate,
            CampaignRewardType rewardType, Integer trafficRequest, CampaignState state
    ) {
        this.keyword = ObjectUtils.isEmpty(keyword) ? this.keyword : keyword;
        this.companyName = ObjectUtils.isEmpty(companyName) ? this.companyName : companyName;
        this.url = ObjectUtils.isEmpty(url) ? this.url: url;
        this.mid = ObjectUtils.isEmpty(mid) ? this.mid: mid;
        this.startDate = ObjectUtils.isEmpty(startDate) ? this.startDate : startDate;
        this.endDate = ObjectUtils.isEmpty(endDate) ? this.getEndDate(): endDate;
        this.rewardType = ObjectUtils.isEmpty(rewardType) ? this.rewardType: rewardType;
        this.trafficRequest = ObjectUtils.isEmpty(trafficRequest) ? this.trafficRequest: trafficRequest;
        this.state = ObjectUtils.isEmpty(state) ? this.state: state;

        if (CampaignRewardType.AUTOCOMPLETE.equals(rewardType)) {
            this.companyName = "";
            this.url = "";
            this.mid = "";
        }
    }

    public void changeState(CampaignState state) {
        if (CampaignState.COMPLETED.equals(state)) {
            if (startDate.isAfter(LocalDate.now()))
                throw CustomException.of(ErrorType.CAMPAIGN_SHUTDOWN_REJECT_BY_NONE_START_CAMPAIGN);

            endDate = LocalDate.now().plusDays(1);
        } else {
            this.state = state;
        }
    }

    public void extendEndDate(int extendDays) {
        if (endDate.isBefore(LocalDate.now()))
            throw CustomException.of(ErrorType.CAMPAIGN_STATE_IS_COMPLETE);
        endDate = endDate.plusDays(extendDays);
    }

    public void completeCampaign() {
        this.state = CampaignState.COMPLETED;
    }

    public void removeMember() {
        this.member = null;
    }
}
