package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.Application;
import com.kosmo.komofunding.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ApplicationService {
    private ApplicationRepository applicationRepository;

    //Application 저장
    public Application saveApplication(Application application) {return applicationRepository.save(application);}

    // 신청 삭제
    public void deleteApplication(String applicationId) {applicationRepository.deleteById(applicationId);
    }

    //Application id로 찾기
    public Optional<Application> findById(String applicationId) {return applicationRepository.findById(applicationId);}

    // 모든 신청 조회
    public List<Application> getAllApplications() {return applicationRepository.findAll();}

    // 특정 사용자 ID로 신청 조회
    public List<Application> getApplicationsByUserId(String userId) {return applicationRepository.findByUserId(userId);}

    // 특정 날짜 범위로 신청 조회
    public List<Application> getApplicationsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return applicationRepository.findByApplicationDateBetween(startDate, endDate);}


}
