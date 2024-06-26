package com.kwon.crmproject.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorType {
    // Member
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 회원을 찾을 수 없습니다."),
    USERNAME_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 아이디입니다. 다시 입력해주세요."),

    // Campaign
    CAMPAIGN_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 캠페인을 찾을 수 없습니다."),
    CAMPAIGN_START_DATE_INVALID_BEFORE_16(HttpStatus.BAD_REQUEST, "현재 시간은 16시 이전이므로, 시작 날짜는 내일부터 등록 가능합니다."),
    CAMPAIGN_START_DATE_INVALID_AFTER_16(HttpStatus.BAD_REQUEST, "현재 시간은 16시 이후이므로, 시작 날짜는 2일 후부터 등록 가능합니다."),


    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,  "서버에 문제가 발생하였습니다. 잠시후 다시 시도해주세요");

    private HttpStatus httpStatus;
    private String message;

    ErrorType(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}

