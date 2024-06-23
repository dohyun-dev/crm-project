package com.kwon.crmproject.campaign.domain.entity;

import lombok.Getter;

@Getter
public enum CampaignRewardType {
    PLACE_TRAFFIC("플레이스 트래픽"),
    SAVE_PLACE("플레이스 저장하기"),
    AUTOCOMPLETE("자동 완성");

    private String description;

    CampaignRewardType(String description) {
        this.description = description;
    }
}
