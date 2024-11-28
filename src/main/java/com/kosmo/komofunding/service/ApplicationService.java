package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.Application;
import com.kosmo.komofunding.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ApplicationService {
    private ApplicationRepository applicationRepository;

    //Application 저장
    public Application saveApplication(Application application) {return applicationRepository.save(application);}

    //Application id로 찾기
    public Optional<Application> findById(String applicationId) {return applicationRepository.findById(applicationId);}
}
