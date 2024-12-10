package com.kosmo.komofunding.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {
    // 업로드 경로 설정 :  D:/temp/upload
    private final Path uploadPath = Paths.get("D:", "temp", "upload");

    // 이미지 업로드 경로 설정
    private final Path impUploadPath = uploadPath.resolve("imgs");
    private final Path htmlUploadPath = uploadPath.resolve("files");

    // 이미지 업로드 메서드
    public String uploadImg(MultipartFile file) throws IOException{
        createDirectoryIfNotExists(impUploadPath);

        // 이미지명 랜덤 변경
        String originalImgname = file.getOriginalFilename();
        String fileExtension = "";

        // 파일 확장자 확인
        if(originalImgname != null && originalImgname.contains(".")){
            fileExtension = originalImgname.substring(originalImgname.lastIndexOf("."));
        }

        String randomImgname = UUID.randomUUID().toString() + fileExtension;

        Path destination = impUploadPath.resolve(randomImgname);
        file.transferTo(destination);

        return randomImgname;
    }

    // 파일 업로드 메서드
    public String uploadFile(MultipartFile file) throws IOException{
        createDirectoryIfNotExists(htmlUploadPath);

        // HTML 파일명 랜덤 변경
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "" ;

        // 파일 확장자 확인
        if(originalFilename != null && originalFilename.contains(".")){
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // 확장자가 .html인 경우만 처리
        if (!fileExtension.equalsIgnoreCase(".html")) {
            throw new IOException("HTML 파일만 업로드 가능합니다.");
        }

        String randomFilename = UUID.randomUUID().toString() + fileExtension;

        Path destination = htmlUploadPath.resolve(randomFilename);
        file.transferTo(destination);

        return randomFilename;
    }


    // 이미지 파일 로드 메서드
    public Path loadImage(String filename) {
        // 이미지 파일 경로 설정
        Path filePath = impUploadPath.resolve(filename);

        // 파일이 존재하면 경로 반환, 존재하지 않으면 예외 처리
        if (!Files.exists(filePath)) {
            throw new RuntimeException("파일을 찾을 수 없습니다: " + filename);
        }

        return filePath;
    }

    // 일반 파일 로드 메서드
    public Path loadFile(String filename) {
        // 일반 파일 경로 설정
        Path filePath = htmlUploadPath.resolve(filename);

        // 파일이 존재하면 경로 반환, 존재하지 않으면 예외 처리
        if (!Files.exists(filePath)) {
            throw new RuntimeException("파일을 찾을 수 없습니다: " + filename);
        }

        return filePath;
    }

    // 디렉토리 존재 여부 확인 후 없으면 생성
    private void createDirectoryIfNotExists(Path directoryPath) throws IOException {
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }
    }
}

