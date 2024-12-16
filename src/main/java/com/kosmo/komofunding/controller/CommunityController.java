package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.common.enums.CommunityCategory;
import com.kosmo.komofunding.dto.CommunityInDTO;
import com.kosmo.komofunding.dto.CommunityOutDTO;
import com.kosmo.komofunding.service.CommunityService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
    @RequestMapping("/api/posts/community")
    @RequiredArgsConstructor
    public class CommunityController{

        @Autowired
        private final CommunityService communityService;

    @GetMapping
    public ResponseEntity<List<CommunityOutDTO>> getAllCommunities() {
        List<CommunityOutDTO> communities = communityService.getAllCommunities();
        return ResponseEntity.ok(communities);
    }

        @GetMapping("/api/category/{category}")
        public ResponseEntity<List<CommunityOutDTO>> getCommunitiesByCategory(@PathVariable String category) {
            CommunityCategory communityCategory = parseCategory(category);
            List<CommunityOutDTO> communities = communityService.getCommunitiesByCategory(communityCategory);
            return ResponseEntity.ok(communities);
        }


        @GetMapping("/{communityNumber}")
        public ResponseEntity<CommunityOutDTO> getCommunityById(@PathVariable Integer communityNumber) {
            CommunityOutDTO community = communityService.getCommunityByNumber(communityNumber);
            return ResponseEntity.ok(community);
        }



//        @PostMapping
//        public ResponseEntity<Map<String, String>> createCommunity(@RequestBody CommunityInDTO communityInDTO) {
//            communityService.createCommunity(communityInDTO);
//            System.out.println("Received request: " + communityInDTO);
//
//            // JSON 형식의 응답 반환
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "Community created successfully");
//            return ResponseEntity.ok(response);
//        }

//    @PostMapping
//    public ResponseEntity<Map<String, String>> createCommunity(@RequestBody CommunityInDTO communityInDTO) {
//        communityService.createCommunity(communityInDTO);
//
//        // JSON 형식의 응답 반환
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "Community created successfully");
//        return ResponseEntity.ok(response);
//    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createCommunity(@RequestBody CommunityInDTO communityInDTO, HttpSession session) {
        String adminId = (String) session.getAttribute("adminId");
        if (adminId == null || adminId.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "세션에 Admin ID가 없습니다. 로그인 상태를 확인해주세요.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // 세션에서 가져온 adminId를 DTO에 설정
        communityInDTO.setAdminId(adminId);

        communityService.createCommunity(communityInDTO);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Community created successfully");
        return ResponseEntity.ok(response);
    }



    @PutMapping("/api/{id}")
        public ResponseEntity<String> updateCommunity(@PathVariable String id, @RequestBody CommunityInDTO communityInDTO) {
            communityService.updateCommunity(id, communityInDTO);
            return ResponseEntity.ok("Community updated successfully");
        }

        @DeleteMapping("/api/{id}")
        public ResponseEntity<String> deleteCommunity(@PathVariable String id) {
            communityService.deleteCommunity(id);
            return ResponseEntity.ok("Community deleted successfully");
        }

        private CommunityCategory parseCategory(String category) {
            try {
                return CommunityCategory.valueOf(category.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("유효하지 않은 카테고리입니다: " + category);
            }
        }
    }