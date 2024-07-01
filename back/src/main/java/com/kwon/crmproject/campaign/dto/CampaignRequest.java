package com.kwon.crmproject.campaign.dto;

import com.kwon.crmproject.campaign.domain.entity.CampaignRewardType;
import com.kwon.crmproject.campaign.domain.entity.CampaignState;
import com.kwon.crmproject.common.constant.ValidationProperties;
import com.kwon.crmproject.common.validator.annotation.MultipleOfFifty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

public abstract class CampaignRequest {

    public record SearchCondition(
            CampaignRewardType rewardType,
            String keyword,
            String companyName
    ) {

    }

    @Data
    public static class Create {
        @NotNull(
                message = ValidationProperties.Message.MEMBER_ID_FIELD_VALIDATION
        )
        private Long memberId;

        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String keyword;

        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String companyName;

        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String url;

        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        @Pattern(
                regexp = ValidationProperties.IS_NUMBER_CHECK_PATTERN,
                message = ValidationProperties.Message.IS_NUMBER_CHECK
        )
        private String mid;

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate startDate;

        private Integer period;

        @NotNull
        private CampaignRewardType rewardType;

        @Size(
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
        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String keyword;

        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String companyName;

        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String url;

        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        @Pattern(
                regexp = ValidationProperties.IS_NUMBER_CHECK_PATTERN,
                message = ValidationProperties.Message.IS_NUMBER_CHECK
        )
        private String mid;

        private LocalDate startDate;

        private Integer period;

        @NotNull
        private CampaignRewardType rewardType;

        @Size(
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

    @Data
    public static class ExtendEndDate {
        List<Integer> idList;
    }
}
