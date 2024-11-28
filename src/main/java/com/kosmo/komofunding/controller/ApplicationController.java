package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.entity.Application;
import com.kosmo.komofunding.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Controller
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/application")
    public ResponseEntity<Application> createApplication(@RequestBody Application application){
        Application savedApplication = applicationService.saveApplication(application);
        return ResponseEntity.ok(savedApplication);
    }

    @GetMapping("/application/{applicationId}")
    public ResponseEntity<Application> getApplicationById(@PathVariable("applicationId") String applicationId){
        Optional<Application> application = applicationService.findById(applicationId);
        return application.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }

}
