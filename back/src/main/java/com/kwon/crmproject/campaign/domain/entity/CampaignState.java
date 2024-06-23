package com.kwon.crmproject.campaign.domain.entity;

import lombok.Getter;

@Getter
public enum CampaignState {
    PENDING_APPROVAL("승인요청"),
    IN_PROGRESS("중지"),
    COMPLETED("종료"),
    ;

    private String description;

    CampaignState(String description) {
        this.description = description;
    }
}
