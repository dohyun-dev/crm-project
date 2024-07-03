package com.kwon.crmproject.campaign.domain.entity;

import lombok.Getter;

@Getter
public enum CampaignState {
    PENDING_APPROVAL("승인요청"),
    IN_PROGRESS("진행중"),
    COMPLETED("종료"),
    ;

    private String description;

    CampaignState(String description) {
        this.description = description;
    }
}
