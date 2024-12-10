// src/service/apiService.js
import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 백엔드 서버의 기본 주소
    timeout: 10000, // 요청 타임아웃 설정 (10초)
});


// 파일 관련 API 
export const fetchImg = (filename) => apiClient.get(`/images/${filename}`);
export const createImg = (formData) => apiClient.post('/upload/image', formData);
export const updateImg = (filename, updatedData) => apiClient.patch(`/images/${filename}`, updatedData); 
export const deleteImg = (filename) => apiClient.delete(`/images/${filename}`);

export const fetchFile = (filename) => apiClient.get(`/files/${filename}`);
export const createFile = (formData) => apiClient.post('/upload/file', formData);
export const updateFile = (filename, updatedData) => apiClient.patch(`/files/${filename}`, updatedData);
export const deleteFile = (filename) => apiClient.delete(`/files/${filename}`);