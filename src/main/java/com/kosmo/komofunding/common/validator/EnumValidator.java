package com.kosmo.komofunding.common.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//EnumValidatorImpl.class를 가져와서 유효성 검사
@Constraint(validatedBy = EnumValidatorImpl.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface EnumValidator {

    String message() default "유효하지 않은 값입니다.";  // 유효성 검사 실패 시 메세지

    Class<?>[] groups() default {}; //검증 그룹 지정

    Class<? extends Payload>[] payload() default {};

    Class<? extends Enum<?>> enumClass();  // 검사할 Enum 클래스
}