package com.kosmo.komofunding.exception;

// 인증되지 않은 사용자가 요청을 보낼때 메세지 발송
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }
}
