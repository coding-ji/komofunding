package com.kosmo.komofunding.common;

import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SessionConfig {
    @Bean
    public HttpSessionListener httpSessionListener() {
        return new HttpSessionListener() {
            @Override
            public void sessionCreated(HttpSessionEvent se) {
                System.out.println("세션이 생성되었습니다.");
            }

            @Override
            public void sessionDestroyed(HttpSessionEvent se) {
                System.out.println("세션이 파괴되었습니다.");
            }
        };
    }
}