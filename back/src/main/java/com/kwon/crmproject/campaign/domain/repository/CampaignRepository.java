package com.kwon.crmproject.campaign.domain.repository;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}