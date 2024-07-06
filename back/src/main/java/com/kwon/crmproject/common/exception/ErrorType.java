package com.kwon.crmproject.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorType {
    // Member
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 회원을 찾을 수 없습니다."),
    USERNAME_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 아이디입니다. 다시 입력해주세요."),
    MEMBER_NAME_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 회원이름입니다. 다시 입력해주세요."),

    // Campaign
    CAMPAIGN_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 캠페인을 찾을 수 없습니다."),
    CAMPAIGN_START_DATE_INVALID_BEFORE_16(HttpStatus.BAD_REQUEST, "현재 시간은 16시 이전이므로, 시작 날짜는 내일부터 등록 가능합니다."),
    CAMPAIGN_START_DATE_INVALID_AFTER_16(HttpStatus.BAD_REQUEST, "현재 시간은 16시 이후이므로, 시작 날짜는 2일 후부터 등록 가능합니다."),
    CAMPAIGN_COMMAND_NOT_FOUND_MEMBER(HttpStatus.BAD_REQUEST, "회원 정보를 찾을 수 없어 요청이 취소됩니다. 다시 시도해주세요."),
    CAMPAIGN_STATE_IS_SAME_STATE(HttpStatus.BAD_REQUEST, "변경하려는 캠페인 상태가 현재와 동일합니다."),
    CAMPAIGN_STATE_IS_COMPLETE(HttpStatus.BAD_REQUEST, "종료된 캠페인이 존재해 요청이 거부되었습니다."),
    CAMPAIGN_SHUTDOWN_REJECT_BY_NONE_START_CAMPAIGN(HttpStatus.BAD_REQUEST, "아직 시작되지 않은 캠페인이 존재해 캠페인을 종료할 수 없습니다."),

    // Auth
    LOGIN_FAILURE(HttpStatus.UNAUTHORIZED, "아이디 혹은 비밀번호를 다시 확인해주세요."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인이 필요한 서비스입니다. 로그인해주세요"),
    TOKEN_EXPIRED(HttpStatus.FORBIDDEN, "토큰이 만료되었습니다. 다시 로그인 해주세요."),

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,  "서버에 문제가 발생하였습니다. 잠시후 다시 시도해주세요");

    private HttpStatus httpStatus;
    private String message;

    ErrorType(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}

