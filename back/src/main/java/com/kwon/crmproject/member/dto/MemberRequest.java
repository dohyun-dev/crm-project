package com.kwon.crmproject.member.dto;

import com.kwon.crmproject.common.constant.ValidationProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

public abstract class MemberRequest {

    public record SearchCondition(
            String companyName
    ) {
    }

    @Data
    public static class Command {
        @NotBlank
        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String companyName;

        @NotBlank
        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String username;

        @NotBlank
        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String password;

        @NotBlank
        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String businessRegistrationNumber;

        @NotBlank
        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String email;

        @NotBlank
        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        @Pattern(
                regexp = ValidationProperties.IS_NUMBER_CHECK_PATTERN,
                message = ValidationProperties.Message.CONTACT_FIELD_VALIDATION
        )
        private String contact;

        @NotBlank
        @Size(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String accountHolder;
    }
}
