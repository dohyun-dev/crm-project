package com.kwon.crmproject.campaign.dto;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import lombok.Data;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public abstract class CampaignResponse {

    @Data
    public static class FindAll {
        private String state;

        private String companyName;

        private String rewardType;

        private String keyword;

        private String url;

        private String mid;

        private int trafficRequest;

        private int trafficRequestTotal;

        private int duration;

        private LocalDate startDate;

        private LocalDate endDate;

        public FindAll(Campaign campaign) {
            int duration = (int) ChronoUnit.DAYS.between(campaign.getStartDate(), campaign.getEndDate()) + 1;
            this.state = campaign.getState().getDescription();
            this.companyName = campaign.getCompanyName();
            this.rewardType = campaign.getRewardType().getDescription();
            this.keyword = campaign.getKeyword();
            this.url = campaign.getUrl();
            this.mid = campaign.getMid();
            this.trafficRequest = campaign.getTrafficRequest();
            this.trafficRequestTotal = campaign.getTrafficRequest() * duration;
            this.duration = duration;
            this.startDate = campaign.getStartDate();
            this.endDate = campaign.getEndDate();
        }
    }
}
