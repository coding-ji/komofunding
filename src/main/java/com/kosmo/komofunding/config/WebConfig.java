package com.kosmo.komofunding.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("api/**")  // 모든 엔드포인트에 대해
                .allowedOrigins("http://localhost:5173")  // 허용할 출처
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")  // 허용할 메서드
                .allowCredentials(true);  // 쿠키 전송을 허용하려면 true 설정
    }

    // BCryptPasswordEncoder 빈 등록
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

