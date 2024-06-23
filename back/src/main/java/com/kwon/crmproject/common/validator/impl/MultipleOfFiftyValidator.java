package com.kwon.crmproject.common.validator.impl;

import com.kwon.crmproject.common.validator.annotation.MultipleOfFifty;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MultipleOfFiftyValidator implements ConstraintValidator<MultipleOfFifty, String> {

    @Override
    public void initialize(MultipleOfFifty constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // if (value == null || value.isEmpty()) {
        //     return true;
        // }

        try {
            int intValue = Integer.parseInt(value);
            return intValue % 50 == 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
