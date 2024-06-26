package com.kwon.crmproject.member.dto;

import com.kwon.crmproject.common.constant.ValidationProperties;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

public abstract class MemberRequest {

    public record SearchCondition(
            String companyName
    ) {
    }

    @Data
    public static class Command {
        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String companyName;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String username;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String password;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String businessRegistrationNumber;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String email;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        @Pattern(
                regexp = ValidationProperties.EXIST_HYPHEN_CHECK_PATTERN,
                message = ValidationProperties.Message.CONTACT_FIELD_VALIDATION
        )
        private String contact;

        @Length(
                max = ValidationProperties.STRING_MAX_LENGTH,
                message = ValidationProperties.Message.STRING_MAX_LENGTH
        )
        private String accountHolder;
    }
}
