package com.kwon.crmproject.campaign.service.impl;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.campaign.domain.entity.CampaignState;
import com.kwon.crmproject.campaign.domain.repository.CampaignRepository;
import com.kwon.crmproject.campaign.dto.CampaignRequest;
import com.kwon.crmproject.campaign.service.CampaignServiceV1;
import com.kwon.crmproject.common.exception.CustomException;
import com.kwon.crmproject.common.exception.ErrorType;
import com.kwon.crmproject.member.domain.entity.Member;
import com.kwon.crmproject.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CampaignServiceV1Impl implements CampaignServiceV1 {

    public static final int VALIDATION_HOUR_THRESHOLD = 16;

    private final MemberRepository memberRepository;

    private final CampaignRepository campaignRepository;

    @Override
    public Campaign findDetail(Long campaignId) {
        return getCampaign(campaignId);
    }

    @Override
    public Page<Campaign> findAll(CampaignRequest.SearchCondition searchCondition, Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Member findMember = memberRepository.findByUsername((String) authentication.getPrincipal())
                .orElseThrow(() -> CustomException.of(ErrorType.UNAUTHORIZED));

        return findMember.isAdmin()
                ? findAllCampaignsForAdmin(searchCondition, pageable)
                : findAllCampaignsForMember(findMember, searchCondition, pageable);
    }

    @Transactional
    @Override
    public void create(CampaignRequest.Create request) {
        Member findMember = getMember(request.getMemberId());

        validateStartDateAgainstCurrentTime(request.getStartDate());

        LocalDate endDate = getEndDate(request.getStartDate(), request.getPeriod());

        Campaign campaign = Campaign.builder()
                .keyword(request.getKeyword())
                .companyName(request.getCompanyName())
                .url(request.getUrl())
                .mid(request.getMid())
                .startDate(request.getStartDate())
                .endDate(endDate)
                .rewardType(request.getRewardType())
                .trafficRequest(Integer.parseInt(request.getTrafficRequest()))
                .state(CampaignState.PENDING_APPROVAL)
                .member(findMember)
                .build();

        campaignRepository.save(campaign);
    }

    @Transactional
    @Override
    public void edit(Long campaignId, CampaignRequest.Edit request) {
        Campaign findCampaign = getCampaign(campaignId);

        findCampaign.update(
                request.getKeyword(),
                request.getCompanyName(),
                request.getUrl(),
                request.getMid(),
                request.getStartDate(),
                request.getEndDate(),
                request.getRewardType(),
                Integer.parseInt(request.getTrafficRequest()),
                request.getCampaignState()
        );
    }

    @Transactional
    @Override
    public void changeState(List<Long> campaignIds, CampaignState state) {
        List<Campaign> campaigns = campaignRepository.findByIdIn(campaignIds);

        campaigns.forEach((c) -> c.changeState(state));
    }

    @Transactional
    @Override
    public void extendEndDate(List<Long> campaignIds, int extendDays) {
        List<Campaign> campaigns = campaignRepository.findByIdIn(campaignIds);

        campaigns.forEach((c) -> c.extendEndDate(extendDays));
    }

    @Transactional
    @Override
    public void delete(Long campaignId) {
        Campaign findCampaign = getCampaign(campaignId);

        campaignRepository.delete(findCampaign);
    }

    private Campaign getCampaign(Long campaignId) {
        return campaignRepository.findById(campaignId)
                .orElseThrow(() -> CustomException.of(ErrorType.CAMPAIGN_NOT_FOUND));
    }

    private LocalDate getEndDate(LocalDate startDate, int period) {
        return startDate.plusDays(period);
    }

    private Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> CustomException.of(ErrorType.CAMPAIGN_COMMAND_NOT_FOUND_MEMBER));
    }

    private void validateStartDateAgainstCurrentTime(LocalDate startDate) {
        LocalDateTime now = LocalDateTime.now();
        LocalDate nowDate = now.toLocalDate();
        int curHour = now.getHour();

        LocalDate validDate = curHour < VALIDATION_HOUR_THRESHOLD ? nowDate.plusDays(0) : nowDate.plusDays(1);

        if (!startDate.isAfter(validDate)) {
            if (curHour < VALIDATION_HOUR_THRESHOLD) {
                throw CustomException.of(ErrorType.CAMPAIGN_START_DATE_INVALID_BEFORE_16);
            } else {
                throw CustomException.of(ErrorType.CAMPAIGN_START_DATE_INVALID_AFTER_16);
            }
        }
    }

    private Page<Campaign> findAllCampaignsForAdmin(CampaignRequest.SearchCondition searchCondition, Pageable pageable) {
        return campaignRepository.findAll(
                null,
                searchCondition,
                pageable
        );
    }

    private Page<Campaign> findAllCampaignsForMember(Member member, CampaignRequest.SearchCondition searchCondition, Pageable pageable) {
        return campaignRepository.findAll(
                member,
                searchCondition,
                pageable
        );
    }
}
