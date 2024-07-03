package com.kwon.crmproject.campaign.api;

import com.kwon.crmproject.campaign.dto.CampaignRequest;
import com.kwon.crmproject.campaign.dto.CampaignResponse;
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
    public CampaignResponse.FindDetail findDetail(@PathVariable("campaignId") Long campaignId) {
        return new CampaignResponse.FindDetail(campaignService.findDetail(campaignId));
    }

    @GetMapping
    public Page<CampaignResponse.FindAll> findAll(CampaignRequest.SearchCondition searchCondition, Pageable pageable) {
        return campaignService.findAll(searchCondition, pageable).map(CampaignResponse.FindAll::new);
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

    @PutMapping("/change-state")
    public void changeState(
            @Valid @RequestBody CampaignRequest.ChangeState request
    ) {
        campaignService.changeState(request.getCampaignIds(), request.getCampaignState());
    }


    @PutMapping("/extend")
    public void extend(
            @Valid @RequestBody CampaignRequest.Extend request
    ) {
        campaignService.extendEndDate(request.getCampaignIds(), request.getExtendDays());
    }

    @DeleteMapping("/{campaignId}")
    public void delete(
            @PathVariable("campaignId") Long campaignId
    ) {
        campaignService.delete(campaignId);
    }
}
