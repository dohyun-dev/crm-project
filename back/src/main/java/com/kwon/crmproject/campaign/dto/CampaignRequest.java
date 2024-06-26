package com.kwon.crmproject.campaign.dto;

import com.kwon.crmproject.campaign.domain.entity.CampaignRewardType;
import com.kwon.crmproject.campaign.domain.entity.CampaignState;
import com.kwon.crmproject.common.constant.ValidationProperties;
import com.kwon.crmproject.common.validator.annotation.MultipleOfFifty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

public abstract class CampaignRequest {

    public record SearchCondition(
            CampaignRewardType rewardType,
            String keyword,
            String companyName
    ) {

    }

    @Data
    public static class Create {
        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String keyword;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String companyName;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String url;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        @Pattern(
                regexp = ValidationProperties.IS_NUMBER_CHECK_PATTERN,
                message = ValidationProperties.Message.IS_NUMBER_CHECK
        )
        private String mid;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private LocalDate startDate;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private int period;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private CampaignRewardType rewardType;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        @Pattern(
                regexp = ValidationProperties.IS_NUMBER_CHECK_PATTERN,
                message = ValidationProperties.Message.IS_NUMBER_CHECK
        )
        @MultipleOfFifty
        private String trafficRequest;
    }

    @Data
    public static class Edit {
        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String keyword;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String companyName;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String url;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        @Pattern(
                regexp = ValidationProperties.IS_NUMBER_CHECK_PATTERN,
                message = ValidationProperties.Message.IS_NUMBER_CHECK
        )
        private String mid;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private LocalDate startDate;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private int period;

        private CampaignRewardType rewardType;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        @Pattern(
                regexp = ValidationProperties.IS_NUMBER_CHECK_PATTERN,
                message = ValidationProperties.Message.IS_NUMBER_CHECK
        )
        @MultipleOfFifty
        private String trafficRequest;

        private CampaignState campaignState;
    }
}
