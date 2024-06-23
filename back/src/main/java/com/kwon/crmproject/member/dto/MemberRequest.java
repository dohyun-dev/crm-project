package com.kwon.crmproject.member.dto;

import com.kwon.crmproject.common.constant.ValidationProperties;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public abstract class MemberRequest {
    public static class Join {
        @Length(max = ValidationProperties.STRING_MAX_LENGTH, message = ValidationProperties.Message.STRING_MAX_LENGTH)
        private String companyName;

        @Length(max = ValidationProperties.STRING_MAX_LENGTH, message = "{String.length.max}")
        private String username;

        @Length(max = ValidationProperties.STRING_MAX_LENGTH, message = "{String.length.max}")
        private String password;

        @Length(max = ValidationProperties.STRING_MAX_LENGTH, message = "{String.length.max}")
        private String businessRegistrationNumber;

        @Length(max = ValidationProperties.STRING_MAX_LENGTH, message = "{String.length.max}")
        private String email;

        @Length(max = ValidationProperties.STRING_MAX_LENGTH, message = "{String.length.max}")
        @Pattern(regexp = ValidationProperties.EXIST_HYPHEN_CHECK_PATTERN, message = "{validation.field.contact}")
        private String contact;

        @Length(max = ValidationProperties.STRING_MAX_LENGTH, message = "{String.length.max}")
        private String accountHolder;
    }
}
