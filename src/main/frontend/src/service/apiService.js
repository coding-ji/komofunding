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
export const updateUserProfile = (userNum, request) => apiClient.patch(`/api/user/${userNum}/my_info/profile`, request);

// 이미지 업로드?
// export const uploadProfileImage = (file) => apiClient.patch(`/api/user/{userNum}/my_info/profile`);

// // 특정 사용자가 제작자 전환을 신청함
// export const applyForCreatorSwitch = (email, requestDTO) => apiClient.post(`/api/user/${email}/my_info/creator-switch`, requestDTO);

// 인증 관련 API
// 회원가입 요청
export const registerUser = (userInDTO) => apiClient.post('/api/auth/register', userInDTO);

// 회원가입 이메일 인증 요청 
export const sendRegisterEmailCode = (email) => apiClient.post('/api/auth/register/emailcheck', { email });

// 이메일 인증 코드 발송 요청
export const sendEmailCode = (email) => apiClient.post('/api/auth/emailcheck', email);

// 이메일 인증 코드 검증 요청
export const verifyEmailCode = (email, verificationCode) => apiClient.post('/api/auth/emailverification', { email, verificationCode });

// 사용자 로그인 요청
export const loginUser = (email, password) => apiClient.post('/api/auth/login', { email, password });

// 사용자 로그아웃
export const logout = () => apiClient.post('/api/auth/logout');

// 닉네임 중복확인
export const checkNickName = (nickName) => apiClient.post('/api/auth/checkNickName', { "nickName": nickName });

// 특정 사용자의 정보를 가져옴 (이메일 기반)
export const getUserInfo = (email) => apiClient.get(`/api/auth/users?email=${email}`);

// 특정 사용자를 삭제 (회원 탈퇴)
export const deleteUser = (userNum) => apiClient.delete(`/api/auth/delete/${userNum}`);

// 이름과 전화번호를 기반으로 이메일 찾기 요청
export const findUserId = (name, phoneNumber) => apiClient.post(`/api/auth/id?name=${name}&phoneNumber=${phoneNumber}`);

// 임시비밀번호 발급
export const getTemporalPw = (email, verificationCode) => apiClient.post('/api/auth/reset-password', {email, verificationCode});

// 이메일로 인증번호 받아서 비밀번호 찾기
export const findUserPassword = (email,verificationCode) => apiClient.post('/api/auth/password/reset', {email, verificationCode});

// 비밀번호 재설정 요청
export const resetPassword = (email) => apiClient.post('/api/auth/pw', email);

// 비밀번호 변경 요청
export const changePassword = (request) => apiClient.patch('/api/auth/setting/pw', request);

// 비밀번호 검증 요청
export const verifyPassword = (userNum, password) => apiClient.post(`/api/auth/pw/${userNum}`, { userNum, password });

// 특정 사용자의 로그인 정지 상태 확인
export const checkSuspension = (userNum) => apiClient.get(`/api/auth/login/status/${userNum}`, userNum);


// 프로젝트 관련 API

// 전체 게시물 조회
export const fetchPosts = () => apiClient.get('/projects');

// 상세 게시물 조회
export const fetchDetailPost = (projectNum) => apiClient.get(`/projects/${projectNum}`)

// 전체 게시물 카테고리별 & 상태별(all, upcoming, active )
export const fetchPostsByCategoryAndStatus = (projectCategory, fundingStatus) => {
  return apiClient.get(`/projects/category?projectCategory=${projectCategory}&fundingStatus=${fundingStatus}`);
};


// 개인 프로젝트
// 조회
export const fetchUserProjects = () => apiClient.get(`/api/user/myinfo/projects`);

// 생성
export const createProject = (projectData) => apiClient.post(`/api/user/myinfo/projects`, projectData);

// 업데이트
export const updateProject = (projectNum, updateData) => apiClient.patch(`/api/user/myinfo/projects/${projectNum}`, updateData);

// 삭제
export const deleteProject = (projectNum) => apiClient.delete(`/api/user/myinfo/projects/${projectNum}`);

// 프로젝트 후원자 조회
export const fetchProjectDonors = (projectNum) => apiClient.get(`api/user/myinfo/projects/donors?projectNum=${projectNum}`)



// 결제 
// 프로젝트 후원자 조회 
export const fetchDonorsByProjectNum = (projectNum) => apiClient.get(`/payment/list?projectNum=${projectNum}`);

// 결제 저장 로직 
export const createPayment = (projectNum, payment) => apiClient.post(`/payment/save?projectNum=${projectNum}`, payment);

// 나의 후원 내역 조회 ( 후원중 , 마감 )
export const getMyFunding = (projectStatus) => apiClient.get(`/payment/myinfo/funding?projectStatus=${projectStatus}`);

// 결제 삭제
export const deletePayment = (paymentId) => apiClient.delete(`/payment/myfunding/${paymentId}`)

// 모든 결제 정보 가져오기
export const allPayment = () => apiClient.get('/payment/list/all');


// 이미지 저장
export const uploadImg = (img) => apiClient.post('/upload/image', img);

export const fetchItems = () => apiClient.get('/items');
export const createItem = (item) => apiClient.post('/items', item);
export const updateItem = (item) => apiClient.put(`/items/${item.id}`, item);
export const deleteItem = (id) => apiClient.delete(`/items/${id}`);


// 커뮤니티 API

// 커뮤니티 목록 가져오기
export const fetchAllCommunities = () => apiClient.get("/api/posts/community");

// 특정 커뮤니티 가져오기 (ID로 검색)
export const fetchCommunityById = (communityNumber) =>
  apiClient.get(`/api/posts/community/${communityNumber}`);

// 새로운 커뮤니티 생성
export const createCommunity = (communityData) =>
  apiClient.post("/api/posts/community", communityData);

// 특정 커뮤니티 수정
export const updateCommunity = (communityNumber, updateData) =>
  apiClient.put(`/api/posts/community/${communityNumber}`, updateData);

// 특정 커뮤니티 삭제
export const deleteCommunity = (communityNumber) =>
  apiClient.delete(`/api/posts/community/${communityNumber}`);


// 신청서 목록 가져오기 
export const fetchAllApplications = () => apiClient.get("/api/applications");

// 신청서 신청
export const createApplication = (data) => apiClient.post("/api/applications/create", data);

// 특정 사용자 신청서 확인
export const fetchApplicationByUserNum = (userNum) => apiClient.post(`/api/applications/user/${userNum}`);


// Admin용 문의 조회
// 전체조회(댓글+문의)
export const readQnaByAdmin = () => apiClient.get('/api/admin/qna/all'); 

// 문의 전체 조회
export const readAllQuestions = () => apiClient.get('/api/admin/qna/question');


// 댓글 혹은 1:1 문의
// 유저 문의 조회
export const readQna = () => apiClient.get('/user/inquiry');

// 1:1 문의 상세 조회 
export const readQnaDetail = (qnaNumber) => apiClient.get(`/qna/${qnaNumber}`);

// 댓글 생성
export const createComment = (projectNum, commentData) => apiClient.post(`/comment/${projectNum}/new`, commentData);

// 1:1 문의 생성
export const createQuestion = (commentData) => apiClient.post(`/qna/new`, commentData);

// 답변 생성
export const replyQna = (qnaNumber, text) => apiClient.patch(`/reply/${qnaNumber}`, { "answer": text });

// 문의 수정
export const updateComment = (qnaNumber,text) => apiClient.patch(`/comment/${qnaNumber}`, {"questionComment" : text})

// ADMIN 
// 모든 유저 정보 가져오기
export const fetchAllUsers = () => apiClient.get(`/api/admin/users`);

//특정 유저 정보 가져오기
export const fetchAllUsersForAdmin = (userNum) => apiClient.get(`/api/admin/users/${userNum}`);

// 유저 삭제? 정지, 탈퇴 회원
// export const deactivateUser = (userNum, deactivationData) => apiClient.put(`api/admin/users/${userNum}/deactivate`, deactivationData);
export const deactivateUser = (userNum) => apiClient.put(`api/admin/users/${userNum}/deactivate`);

// 모든 프로젝트 조회 및 특정 프로젝트 조회
export const fetchAllProjects = ()  => apiClient.get('api/admin/projects');
export const fetchAllProjectsForAdmin = (projectNum) => apiClient.get(`/api/admin/projects?projectNum=${projectNum}`);

// 프로젝트 승인
export const approveProject = (projectNum) => apiClient.put(`api/admin/projects/${projectNum}/approve`);

// 프로젝트 거절
export const rejectProject = (projectNum) => apiClient.put(`api/admin/projects/${projectNum}/reject`);

// 프로젝트 공개/숨김 처리
export const ProjectVisibility = (projectNum) => apiClient.put(`api/admin/projects/${projectNum}/toggleVisibility`);


// 특정 프로젝트 삭제
export const deleteProjectByAdmin = (projectNum) => apiClient.delete(`/admin/projects/${projectNum}`);

export default apiClient;
