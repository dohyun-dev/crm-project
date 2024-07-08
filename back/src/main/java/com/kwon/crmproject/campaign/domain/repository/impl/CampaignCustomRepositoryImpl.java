package com.kwon.crmproject.campaign.domain.repository.impl;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.campaign.domain.entity.CampaignRewardType;
import com.kwon.crmproject.campaign.domain.repository.CampaignCustomRepository;
import com.kwon.crmproject.campaign.dto.CampaignRequest;
import com.kwon.crmproject.member.domain.entity.Member;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.kwon.crmproject.campaign.domain.entity.QCampaign.campaign;
import static com.kwon.crmproject.member.domain.entity.QMember.member;

@Transactional
@Repository
@RequiredArgsConstructor
public class CampaignCustomRepositoryImpl implements CampaignCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Campaign> findAll(Member curMember, CampaignRequest.SearchCondition searchCondition, Pageable pageable) {
        List<Campaign> results = queryFactory
                .selectFrom(campaign)
                .leftJoin(campaign.member, member).fetchJoin()
                .where(
                        memberEq(curMember),
                        rewardTypeEq(searchCondition.rewardType()),
                        memberNameContains(searchCondition.memberName()),
                        companyNameContains(searchCondition.companyName())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .selectFrom(campaign)
                .leftJoin(campaign.member, member)
                .where(
                        memberEq(curMember),
                        rewardTypeEq(searchCondition.rewardType()),
                        memberNameContains(searchCondition.memberName()),
                        companyNameContains(searchCondition.companyName())
                )
                .fetch().size();

        return new PageImpl<>(results, pageable, total);
    }

    private BooleanExpression memberEq(Member curMember) {
        return curMember != null ? member.eq(curMember) : null;
    }

    private BooleanExpression rewardTypeEq(CampaignRewardType rewardType) {
        return rewardType != null ? campaign.rewardType.eq(rewardType) : null;
    }

    private BooleanExpression memberNameContains(String memberName) {
        return memberName != null && !memberName.isEmpty() ? campaign.member.name.containsIgnoreCase(memberName) : null;
    }

    private BooleanExpression companyNameContains(String companyName) {
        return companyName != null && !companyName.isEmpty() ? campaign.companyName.containsIgnoreCase(companyName) : null;
    }
}
