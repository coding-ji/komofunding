package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.service.FileService;
import org.springframework.core.io.Resource;
import jakarta.servlet.ServletContext;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
    private final ServletContext servletContext;

    // 이미지 불러오는 로직
    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable("filename") String filename) {
        try {
            // 이미지 또는 일반 파일 로드 - true는 이미지를 의미
            Path file = fileService.loadImage(filename);
            Resource resource = new UrlResource(file.toUri());

            // 파일이 존재하고 읽을 수 있는지 확인
            if (!resource.exists() || !Files.isReadable(file)) {
                return ResponseEntity.notFound().build();
            }

            String contentType = servletContext.getMimeType(resource.getFile().getAbsolutePath());

            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 파일불러오는 로직
    @GetMapping("/files/{filename}")
    public ResponseEntity<Resource> getHtmlFile(@PathVariable("filename")  String filename) {
        try {
            Path filePath = fileService.loadFile(filename);  // HTML 파일을 요청하므로 isImage = false
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();  // 파일이 존재하지 않으면 404 반환
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "text/html")  // HTML MIME 타입 설정
                    .body(resource);  // HTML 파일 리소스를 응답 본문으로 반환

        } catch (IOException e) {
            // 파일 경로 처리 중 발생한 IO 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 이미지 저장하는 로직
    @PostMapping("/upload/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String imageFileName = fileService.uploadImg(file);  // 이미지 업로드 처리
            String imagePath = "http://localhost:8080/images/" + imageFileName;  // 파일 경로 리턴
            return ResponseEntity.ok(imagePath);  // 단일 파일 경로 반환
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 실패: " + e.getMessage());
        }
    }
    // 파일 저장하는 로직
    @PostMapping("/upload/file")
    public ResponseEntity<String> uploadHtmlFile(@RequestParam("file") MultipartFile file) {
        try {
            String htmlFileName = fileService.uploadFile(file);  // HTML 파일 업로드 처리

            // 응답으로 파일 경로 전달
            return ResponseEntity.ok("http://localhost:8080/files/" + htmlFileName);  // 파일 경로 리턴
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("HTML 파일 업로드 실패: " + e.getMessage());
        }
    }
}
