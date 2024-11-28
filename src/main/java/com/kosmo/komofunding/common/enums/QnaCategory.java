package com.kosmo.komofunding.common.enums;

public enum QnaCategory {
    COMMENT("프로젝트"), // 프로젝트에 문의댓글
    QUESTION("1:1문의");// 운영자에게 문의글

    private final String description;

    QnaCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
