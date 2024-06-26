package com.kwon.crmproject.campaign.api;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.campaign.dto.CampaignRequest;
import com.kwon.crmproject.campaign.service.CampaignServiceV1;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/campaigns")
public class CampaignApiControllerV1 {

    private final CampaignServiceV1 campaignService;

    @GetMapping("/{campaignId}")
    public Campaign findDetail(@PathVariable("campaignId") Long campaignId) {
        return campaignService.findDetail(campaignId);
    }

    @GetMapping
    public Page<Campaign> findAll(CampaignRequest.SearchCondition searchCondition, Pageable pageable) {
        return campaignService.findAll(searchCondition, pageable);
    }

    @PostMapping
    public void create(@Valid @RequestBody CampaignRequest.Create request) {
        campaignService.create(request);
    }

    @PutMapping("/{campaignId}")
    public void edit(
            @PathVariable("campaignId") Long campaignId,
            @Valid @RequestBody CampaignRequest.Edit request
    ) {
        campaignService.edit(campaignId, request);
    }

    @DeleteMapping("/{campaignId}")
    public void delete(
            @PathVariable("campaignId") Long campaignId
    ) {
        campaignService.delete(campaignId);
    }
}