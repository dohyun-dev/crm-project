package com.kwon.crmproject.campaign.domain.repository;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.campaign.dto.CampaignRequest;
import com.kwon.crmproject.member.domain.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CampaignCustomRepository {
    Page<Campaign> findAll(Member memberId, CampaignRequest.SearchCondition searchCondition, Pageable pageable);
}
