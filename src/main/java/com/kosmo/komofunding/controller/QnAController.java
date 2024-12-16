package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.common.enums.QnaCategory;
import com.kosmo.komofunding.converter.QnAConverter;
import com.kosmo.komofunding.dto.QnAInDTO;
import com.kosmo.komofunding.dto.QnAOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.QnA;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import com.kosmo.komofunding.service.QnAService;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class QnAController {

    private final QnAService qnAService;
    private final QnAConverter qnAConverter;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    // 전체조회(admin용)
    @GetMapping("/api/admin/qna/all")
    public List<QnAOutDTO> getAllQnas() {
        return qnAService.getAllQnas();
    }

    // QUESTION만 전체 조회 (admin용)
    @GetMapping("/api/admin/qna/question")
    public List<QnAOutDTO> getQuestions() {
        return qnAService.getQnasByCategory(QnaCategory.QUESTION);
    }

    // 1:1 문의 상세 조회
    @GetMapping("/qna/{qnaNumber}")
    public QnAOutDTO getQnaDetail(@PathVariable("qnaNumber") Long qnaNumber,
                                  HttpSession session) {
        return qnAService.getQnaDetailByNumberAndUser(qnaNumber, session);
    }

    // 1:1 문의글 생성
    @PostMapping("/qna/new")
    public ResponseEntity<Map<String, String>> createQuestion(@RequestBody QnAInDTO qnaInDTO, HttpSession session) {
        // 서비스에서 댓글 생성 처리
        qnAService.createQnA(qnaInDTO, session);

        // 성공 메시지 설정
        Map<String, String> response = new HashMap<>();
        response.put("message", "작성이 완료 되었습니다. ");

        // 201 Created 상태와 함께 메시지 반환
        return ResponseEntity.status(201).body(response);
    }

    // 프로젝트 댓글 생성
    @PostMapping("/comment/{projectNum}/new")
    public ResponseEntity<Map<String, String>> createComment(
            @PathVariable("projectNum") Long projectNumber,
            @RequestBody QnAInDTO qnaInDTO,
            HttpSession session) {

        // 프로젝트를 찾기
        Optional<Project> project = projectRepository.findByProjectNum(projectNumber);
        if (project.isEmpty()) {
            throw new IllegalStateException("프로젝트를 찾을 수 없습니다.");
        }

        // 서비스에서 댓글 생성 처리
        QnA qna = qnAService.createQnA(qnaInDTO, session);

        // qnaId를 프로젝트의 qnaIdList에 추가
        List<String> qnaIdList = project.get().getQnaIdList();
        if (qna.getQnaId() != null) { // null 체크
            qnaIdList.add(qna.getQnaId().toString());
        } else {
            throw new IllegalStateException("qnaId가 생성되지 않았습니다.");
        }

        // 프로젝트 업데이트
        projectRepository.save(project.get());

        // 성공 메시지 설정
        Map<String, String> response = new HashMap<>();
        response.put("message", "작성이 완료 되었습니다. ");

        // 201 Created 상태와 함께 메시지 반환
        return ResponseEntity.status(201).body(response);
    }

    // 답변 생성
    @PatchMapping("/reply/{qnaNumber}")
    public ResponseEntity<Map<String, String>> updateQna(@PathVariable("qnaNumber") Long qnaNumber, @RequestBody QnAInDTO qnAInDTO, HttpSession session) {

        try {
            // 답변 업데이트
            Optional<QnA> updatedQna = qnAService.updateAnswer(qnaNumber, qnAInDTO, session);

            if (updatedQna.isPresent()) {
                // 답변 업데이트가 성공적으로 이루어졌으면
                Map<String, String> response = new HashMap<>();
                response.put("message", "답변이 성공적으로 업데이트되었습니다.");
                return ResponseEntity.ok(response);
            } else {
                // QnA가 없거나 답변 업데이트 실패 시
                Map<String, String> response = new HashMap<>();
                response.put("message", "답변을 찾을 수 없습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (IllegalStateException e) {
            // 세션 정보가 없는 경우
            Map<String, String> response = new HashMap<>();
            response.put("message", "사용자 인증 정보가 없습니다.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        } catch (Exception e) {
            // 다른 예외 처리
            Map<String, String> response = new HashMap<>();
            response.put("message", "답변 업데이트 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 댓글 업데이트
    @PatchMapping("/comment/{qnaNumber}")
    public ResponseEntity<Map<String, String>> updateComment(
            @PathVariable("qnaNumber") Long qnaNumber,
            @RequestBody QnAInDTO qnAInDTO,
            HttpSession session) {

        try {
            Optional<QnA> updatedQnA = qnAService.updateComment(qnaNumber, qnAInDTO, session);

            if (updatedQnA.isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "댓글이 성공적으로 업데이트되었습니다.");
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "해당 QnA가 존재하지 않습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (IllegalStateException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // 유저 댓글 찾기
    @GetMapping("/user/inquiry")
    public ResponseEntity<List<QnAOutDTO>> getAllByUserId(HttpSession session) {
        // Retrieve userId from session
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401).body(null);
        }

        // Fetch QnA data by userId from the service
        List<QnA> qnaList = qnAService.getQnaByUserId(userId);

        // Convert the list of QnA entities to DTOs using map
        List<QnAOutDTO> qnaDTOList = qnaList.stream()
                .map(qnAConverter::toOutDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(qnaDTOList);
    }


    // 유저의 1:1 문의 검색 (userId 기반)
//    @GetMapping("/question")
//    public ResponseEntity<List<QnAOutDTO>> readAllQnaForUser(HttpSession session) {
//        // 세션에서 userId를 가져옴
//        String userId = (String) session.getAttribute("userId");
//
//        // 유저의 1:1 문의 목록을 가져옴
//        List<QnA> qnas = qnAService.getQnaByUserIdAndCategory(userId, QnaCategory.QUESTION);

//        // QnA 리스트를 QnAOutDTO 리스트로 변환
//        List<QnAOutDTO> response = qnas.stream()
//                .map(qna -> qnAConverter.toOutDTO(qna) // QnA 엔티티를 DTO로 변환
//                .collect(Collectors.toList());
//
//        // 변환된 QnAOutDTO 리스트를 반환
//        return ResponseEntity.ok(response);
//    }

//    // 2. 유저의 특정 1:1 문의글 상세 조회  ==> 해당하는 user만 볼 수 있도록
//    @GetMapping("/question/{qnaNumber}")
//    public ResponseEntity<QnAOutDTO> readQnAByQnaNumberForUser(@PathVariable("qnaNumber") Long qnaNumber, HttpSession session) {
//        String userId = (String) session.getAttribute("userId");
//        Optional<QnA> qna = qnAService.getQnaByQnaNumberAndUserId(qnaNumber, userId);
//
//        if(qna.isPresent()){
//            QnAOutDTO response = qnAConverter.toOutDTO(qna);
//        }
//
//    }
//
//    // 3. 관리자용 1:1 문의글 전체 조회
//    @GetMapping("/admin/question")
//    public ResponseEntity<QnAOutDTO> readAllQnaForAdmin() {
//        List<QnA> qnas = qnAService.getAllQnasByCategory(QnaCategory.QUESTION);
//        QnAOutDTO response = new QnAOutDTO(qnas);
//        return ResponseEntity.ok(response);
//    }
//
//    // 4. 프로젝트 댓글 조회 (COMMENT 카테고리)
//    @GetMapping("/comment")
//    public ResponseEntity<QnAOutDTO> readAllComments(HttpSession session) {
//        String userId = (String) session.getAttribute("userId");
//        List<QnA> comments = qnAService.getQnasByUserIdAndCategory(userId, QnaCategory.COMMENT);
//        QnAOutDTO response = new QnAOutDTO(comments);
//        return ResponseEntity.ok(response);
//    }
//
//    // 5. 프로젝트 댓글 상세 조회
//    @GetMapping("/comment/{qnaNumber}")
//    public ResponseEntity<QnAOutDTO> readCommentByQnaNumber(@PathVariable("qnaNumber") Long qnaNumber, HttpSession session) {
//        String userId = (String) session.getAttribute("userId");
//        Optional<QnA> comment = qnAService.getQnaByQnaNumberAndUserId(qnaNumber, userId);
//        if (comment.isPresent()) {
//            QnAOutDTO response = new QnAOutDTO(comment.get());
//            return ResponseEntity.ok(response);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//
//    // 7. 문의글 수정 (유저, 관리자가 모두 수정 가능)
//    @PatchMapping
//    public ResponseEntity<Map<String, String>> updateQna(@RequestBody QnA qnA) {
//        Optional<QnA> updatedQnA = qnAService.updateQnA(qnA.getQnaId(), qnA);
//        if (updatedQnA.isPresent()) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "문의글이 수정되었습니다.");
//            return ResponseEntity.ok(response);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // 8. 문의글 삭제 (유저, 관리자가 모두 삭제 가능)
//    @DeleteMapping
//    public ResponseEntity<Map<String, String>> deleteQna(@RequestParam String qnaId) {
//        boolean isDeleted = qnAService.deleteQnA(qnaId);
//        if (isDeleted) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "문의글이 삭제되었습니다.");
//            return ResponseEntity.ok(response);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
}