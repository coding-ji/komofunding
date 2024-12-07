package com.kosmo.komofunding.exception;

import com.kosmo.komofunding.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // 400 Bad Request 처리: 유효성 검사 실패 시
    // @Valid, @Validated 유효성 검사를 적용한 DTO나 엔티티에서 예외처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        BindingResult result = ex.getBindingResult();
        List<ObjectError> allErrors = result.getAllErrors();
        for (ObjectError error : allErrors) {
            errors.put(error.getObjectName(), error.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    // 401 Unauthorized 처리: 인증되지 않은 사용자
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Map<String, String>> handleUnauthorizedException(UnauthorizedException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "인증되지 않은 사용자입니다.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    // 사용방법 : throw new UnauthorizedException("로그인정보가 유효하지않습니다" );

    // 500 Internal Server Error 처리: 서버 내부 오류 발생 시
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleServerError(Exception ex) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "서버 내부 오류가 발생했습니다. 다시 시도해주세요.");
        // 서버 로그에 에러 기록
        ex.printStackTrace();  // 혹은 로깅 프레임워크 사용
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
