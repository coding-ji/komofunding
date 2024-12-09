// src/service/apiService.js
import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 백엔드 서버의 기본 주소
    timeout: 10000, // 요청 타임아웃 설정 (10초)
    headers: { 'Content-Type': 'application/json' }, // 기본 헤더 설정
});

// 유저 관련 API
// 현재 로그인한 사용자의 정보를 가져옴
export const getMyPageInfo = () => apiClient.get('/api/user/my_info');

// 특정 사용자의 프로필 정보를 가져옴 (유저번호 기준)
export const getUserProfile = (userNum) => apiClient.get(`/api/user/${userNum}/my_info/profile`);

// 특정 사용자의 프로필을 업데이트
export const updateUserProfile = (email, userProfileUpdateDTO) => apiClient.patch('/api/user/${email}/my_info/profile', userInDTO);

// 특정 사용자가 제작자 전환을 신청함
export const applyForCreatorSwitch = (email, requestDTO) => apiClient.post(`/api/user/${email}/my_info/creator-switch`, requestDTO);

// 인증 관련 API
// 회원가입 요청
export const registerUser = (userInDTO) => apiClient.post('/api/auth/register', userInDTO);

// 회원가입 이메일 인증 요청 
export const sendRegisterEmailCode = (email) => apiClient.post('/api/auth/register/emailcheck', {email});

// 이메일 인증 코드 발송 요청
export const sendEmailCode = (email) => apiClient.post('/api/auth/emailcheck', { email });

// 이메일 인증 코드 검증 요청
export const verifyEmailCode = (email, verificationCode) => apiClient.post('/api/auth/emailverification', { email, verificationCode });

// 사용자 로그인 요청
export const loginUser = (email, password) => apiClient.post('/api/auth/login', { email, password });

// 사용자 로그아웃
export const logout = () => apiClient.post('/api/auth/logout');


// 특정 사용자의 정보를 가져옴 (이메일 기반)
export const getUserInfo = (email) => apiClient.get(`/api/auth/users?email=${email}`);

// 특정 사용자를 삭제 (회원 탈퇴)
export const deleteUser = (userNum) => apiClient.delete(`/api/auth/delete/${userNum}`);

// 이름과 전화번호를 기반으로 이메일 찾기 요청
export const findUserId = (name, phoneNumber) => apiClient.post('/api/auth/id', { name, phoneNumber });

// 비밀번호 재설정 요청
export const resetPassword = (email) => apiClient.post('/api/auth/pw', { email });

// 비밀번호 변경 요청
export const changePassword = (email, newPassword) => apiClient.patch(`/api/auth/setting/pw`, { email, newPassword });

// 비밀번호 검증 요청
export const verifyPassword = (userNum, password) => apiClient.post(`/api/auth/pw/${userNum}`, { password });

// 특정 사용자의 로그인 정지 상태 확인
export const checkSuspension = (userNum) => apiClient.get(`/api/auth/login/status/${userNum}`);


// 프로젝트 관련 API
// 모든 프로젝트 목록을 가져옴
export const fetchProjects = () => apiClient.get('/posts');

// 프로젝트 카테고리 & 펀딩 상태에 따라 가져옴 
export const fetchProjectsByCategoryAndStatus = (projectCategory, fundingStatus) => {
    return apiClient.get(`/posts/category?projectCategory=${projectCategory}&fundingStatus=${fundingStatus}`);
};

// 새로운 프로젝트를 생성
export const createProject = (projectData) => apiClient.post('/api/projects', projectData);

// 특정 프로젝트를 업데이트
export const updateProject = (projectId, updateData) => apiClient.put(`/api/projects/${projectId}`, updateData);

// 특정 프로젝트를 삭제
export const deleteProject = (projectId) => apiClient.delete(`/api/projects/${projectId}`);

// 댓글 관련 API
// 특정 게시물의 댓글 목록을 가져옴
export const fetchComments = (postId) => apiClient.get(`/api/comments?postId=${postId}`);

// 새로운 댓글을 생성
export const createComment = (commentData) => apiClient.post('/api/comments', commentData);

// 특정 댓글을 업데이트
export const updateComment = (commentId, updateData) => apiClient.put(`/api/comments/${commentId}`, updateData);

// 특정 댓글을 삭제
export const deleteComment = (commentId) => apiClient.delete(`/api/comments/${commentId}`);

export const fetchItems = () => apiClient.get('/items');
export const createItem = (item) => apiClient.post('/items', item);
export const updateItem = (item) => apiClient.put(`/items/${item.id}`, item);
export const deleteItem = (id) => apiClient.delete(`/items/${id}`);

export default apiClient;
