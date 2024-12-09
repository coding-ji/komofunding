package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.common.enums.CommunityCategory;
import com.kosmo.komofunding.dto.CommunityInDTO;
import com.kosmo.komofunding.dto.CommunityOutDTO;
import com.kosmo.komofunding.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



    @RestController
    @RequestMapping("/posts/community")
    @RequiredArgsConstructor
    public class CommunityController{

        private final CommunityService communityService;

        @GetMapping("/category/{category}")
        public ResponseEntity<List<CommunityOutDTO>> getCommunitiesByCategory(@PathVariable String category) {
            CommunityCategory communityCategory = parseCategory(category);
            List<CommunityOutDTO> communities = communityService.getCommunitiesByCategory(communityCategory);
            return ResponseEntity.ok(communities);
        }

        @GetMapping("/{id}")
        public ResponseEntity<CommunityOutDTO> getCommunityById(@PathVariable String id) {
            CommunityOutDTO community = communityService.getCommunityById(id);
            return ResponseEntity.ok(community);
        }

        @PostMapping
        public ResponseEntity<String> createCommunity(@RequestBody CommunityInDTO communityInDTO) {
            communityService.createCommunity(communityInDTO);
            return ResponseEntity.ok("Community created successfully");
        }

        @PutMapping("/{id}")
        public ResponseEntity<String> updateCommunity(@PathVariable String id, @RequestBody CommunityInDTO communityInDTO) {
            communityService.updateCommunity(id, communityInDTO);
            return ResponseEntity.ok("Community updated successfully");
        }

        @DeleteMapping("/{id}")
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