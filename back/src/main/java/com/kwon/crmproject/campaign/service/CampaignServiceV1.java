package com.kwon.crmproject.campaign.service;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.campaign.dto.CampaignRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CampaignServiceV1 {
    Campaign findDetail(Long campaignId);
    Page<Campaign> findAll(CampaignRequest.SearchCondition searchCondition, Pageable pageable);
    void create(CampaignRequest.Create request);
    void edit(Long campaignId, CampaignRequest.Edit request);
    void extendEndDate(CampaignRequest.ExtendEndDate extendEndDate);
    void delete(Long campaignId);
}
