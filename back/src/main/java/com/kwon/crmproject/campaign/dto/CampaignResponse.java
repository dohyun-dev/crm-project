package com.kwon.crmproject.campaign.dto;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.campaign.domain.entity.CampaignRewardType;
import lombok.Data;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public abstract class CampaignResponse {

    @Data
    public static class FindDetail {
        private Long id;

        private Long memberId;

        private String memberName;

        private String state;

        private String companyName;

        private CampaignRewardType rewardType;

        private String keyword;

        private String url;

        private String mid;

        private int trafficRequest;

        private int trafficRequestTotal;

        private int period;

        private LocalDate startDate;

        private LocalDate endDate;

        public FindDetail(Campaign campaign) {
            this.id = campaign.getId();
            this.memberId = campaign.getMember().getId();
            this.memberName = campaign.getMember().getName();
            int period = (int) ChronoUnit.DAYS.between(campaign.getStartDate(), campaign.getEndDate()) + 1;
            this.state = campaign.getState().getDescription();
            this.companyName = campaign.getCompanyName();
            this.rewardType = campaign.getRewardType();
            this.keyword = campaign.getKeyword();
            this.url = campaign.getUrl();
            this.mid = campaign.getMid();
            this.trafficRequest = campaign.getTrafficRequest();
            this.trafficRequestTotal = campaign.getTrafficRequest() * period;
            this.period = period;
            this.startDate = campaign.getStartDate();
            this.endDate = campaign.getEndDate();
        }
    }

    @Data
    public static class FindAll {
        private Long id;

        private String state;

        private String memberName;

        private String companyName;

        private String rewardType;

        private String keyword;

        private String url;

        private String mid;

        private int trafficRequest;

        private int trafficRequestTotal;

        private int period;

        private LocalDate startDate;

        private LocalDate endDate;

        public FindAll(Campaign campaign) {
            this.id = campaign.getId();
            int period = (int) ChronoUnit.DAYS.between(campaign.getStartDate(), campaign.getEndDate()) + 1;
            this.state = campaign.getState().getDescription();
            this.memberName = campaign.getMember().getName();
            this.companyName = campaign.getCompanyName();
            this.rewardType = campaign.getRewardType().getDescription();
            this.keyword = campaign.getKeyword();
            this.url = campaign.getUrl();
            this.mid = campaign.getMid();
            this.trafficRequest = campaign.getTrafficRequest();
            this.trafficRequestTotal = campaign.getTrafficRequest() * period;
            this.period = period;
            this.startDate = campaign.getStartDate();
            this.endDate = campaign.getEndDate();
        }
    }
}
