package com.kwon.crmproject.common.validator.annotation;

import com.kwon.crmproject.common.constant.ValidationProperties;
import com.kwon.crmproject.common.validator.impl.MultipleOfFiftyValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = MultipleOfFiftyValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MultipleOfFifty {
    String message() default ValidationProperties.Message.MULTIPLE_OF_FIFTY;
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
