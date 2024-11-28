package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.entity.QnA;
import com.kosmo.komofunding.service.QnAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
public class QnAController {

    @Autowired
    private QnAService qnAService;

    @PostMapping("/api/qna")
    public ResponseEntity<QnA> createQnA(@RequestBody QnA qnA) {
        QnA savedQnA = qnAService.saveQnA(qnA);
        return ResponseEntity.ok(savedQnA);
    }

    @GetMapping("/api/qna/{userId}")
    public ResponseEntity<QnA> getQnaByUserId(@PathVariable("userId") String userId) {
        Optional<QnA> qna = qnAService.getQnaByUserId(userId);
        return qna.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}