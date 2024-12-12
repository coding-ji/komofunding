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
export const updateUserProfile = (userNum, userProfileUpdateDTO) => apiClient.patch('/api/user/${email}/my_info/profile', userInDTO);

// 이미지 업로드?
export const uploadProfileImage = (file) => apiClient.patch(`/api/user/{userNum}/my_info/profile`);

// 특정 사용자가 제작자 전환을 신청함
export const applyForCreatorSwitch = (email, requestDTO) => apiClient.post(`/api/user/${email}/my_info/creator-switch`, requestDTO);

// 인증 관련 API
// 회원가입 요청
export const registerUser = (userInDTO) => apiClient.post('/api/auth/register', userInDTO);

// 회원가입 이메일 인증 요청 
export const sendRegisterEmailCode = (email) => apiClient.post('/api/auth/register/emailcheck', { email });

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
export const changePassword = (email, newPassword) => apiClient.patch('/api/auth/setting/pw', { email, newPassword });

// 비밀번호 검증 요청
export const verifyPassword = (userNum, password) => apiClient.post(`/api/auth/pw/${userNum}`, { userNum, password });

// 특정 사용자의 로그인 정지 상태 확인
export const checkSuspension = (userNum) => apiClient.get(`/api/auth/login/status/${userNum}`, {userNum});

// 프로젝트 관련 API
// 전체 게시물 조회
export const fetchPosts = () => apiClient.get('/posts');

// 상세 게시물 조회
export const fetchDetailPost = () => apiClient.get(`/posts/${projectNum}`)

// 전체 게시물 카테고리별 & 상태별(all, upcoming, active )
export const fetchPostsByCategoryAndStatus = (projectCategory, fundingStatus) => {
    return apiClient.get(`/posts/category?projectCategory=${projectCategory}&fundingStatus=${fundingStatus}`);
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






// 댓글 관련 API
// 특정 게시물의 댓글 목록을 가져옴
export const fetchComments = (postId) => apiClient.get(`/api/comments?postId=${postId}`);

// 새로운 댓글을 생성
export const createComment = (commentData) => apiClient.post('/api/comments', commentData);

// 특정 댓글을 업데이트
export const updateComment = (commentId, updateData) => apiClient.put(`/api/comments/${commentId}`, updateData);

// 특정 댓글을 삭제
export const deleteComment = (commentId) => apiClient.delete(`/api/comments/${commentId}`);

// 이미지 저장
export const uploadImg = (img) => apiClient.post('/upload/image', img);

export const fetchItems = () => apiClient.get('/items');
export const createItem = (item) => apiClient.post('/items', item);
export const updateItem = (item) => apiClient.put(`/items/${item.id}`, item);
export const deleteItem = (id) => apiClient.delete(`/items/${id}`);


// 커뮤니티 API

// 커뮤니티 목록 가져오기
export const fetchAllCommunities = () => apiClient.get("/posts/community");

// 특정 커뮤니티 가져오기 (ID로 검색)
export const fetchCommunityById = (communityId) =>
  apiClient.get(`/api/posts/community/${communityId}`);

// 새로운 커뮤니티 생성
export const createCommunity = (communityData) =>
  apiClient.post("/api/posts/community", communityData);

// 특정 커뮤니티 수정
export const updateCommunity = (communityId, updateData) =>
  apiClient.put(`/api/posts/community/${communityId}`, updateData);

// 특정 커뮤니티 삭제
export const deleteCommunity = (communityId) =>
  apiClient.delete(`/api/posts/community/${communityId}`);


export default apiClient;
