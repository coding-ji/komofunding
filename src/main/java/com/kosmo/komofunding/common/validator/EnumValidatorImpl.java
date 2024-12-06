package com.kosmo.komofunding.common.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EnumValidatorImpl implements ConstraintValidator<EnumValidator, String> {

    private Enum<?>[] enumConstants;

    @Override
    public void initialize(EnumValidator annotation) {
        // enumClass 속성으로 전달된 Enum 상수값 가져오기
        this.enumConstants = annotation.enumClass().getEnumConstants();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        for (Enum<?> enumConstant : enumConstants) {
            if (enumConstant.name().equals(value)) {
                return true;  // 유효한 값이면 true
            }
        }
        return false;  // 유효하지 않으면 false
    }
}