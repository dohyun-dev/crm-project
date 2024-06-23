package com.kwon.crmproject.common.constant;

public interface ValidationProperties {
    int STRING_MAX_LENGTH = 1024;

    // pattern
    String EXIST_HYPHEN_CHECK_PATTERN = "^[^-]*$";
    String IS_NUMBER_CHECK_PATTERN = "^[0-9]+$";

    // message
    interface Message {
        String STRING_LENGTH_MAX = "{String.length.max}";
        String IS_NUMBER_CHECK = "{validation.IS_NUMBER_CHECK_PATTERN}";
        String MULTIPLE_OF_FIFTY = "{validation.MultipleOfFifty}";
    }
}