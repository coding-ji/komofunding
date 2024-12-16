import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import MyNav from "./components/MyNav";
import Upcoming from "./page/Upcoming/Upcoming";
import Ongoing from "./page/Ongoing/Ongoing";
import Completed from "./page/Completed/Completed";
import MyQnA from "./page/MyPage/MyQnA";
import Main from "./page/Main/Main";
import Product from "./page/MainProduct/Product";
import WriteQnA from "./page/MyPage/writeQnA/WriteQnA";
import QnAListPage from "./page/MyPage/QnAListPage";
import QnAView from "./page/MyPage/QnAView";
import MyFunding from "./page/MyFunding/MyFunding";
import MainMenu from "./components/MainMenu/MainMenu";
import Login from "./page/LoginSign/Login";
import FindAccount from "./page/LoginSign/FindAccount";
import SignupForm from "./page/LoginSign/SignupForm";
import HomePage from "./page/Home/HomePage";
import NoticePage from "./page/noticpage/NoticePage";
import CreatorApply from "./page/MyPage/CreatorApply/CreatorApply";
import TitleProduct from "./components/TitleProduct";
import TitleBox from "./components/TitleBox";
import DescriptionProduct from "./components/DescriptionProduct";
import Input from "./components/input";
import SelectPrjOne from "./page/SeletPrjOne/SeletPrjOne";
import SelectPrj from "./page/SelectPrj/SelectPrj";
import SelectPrjTwo from "./page/SelectPrjTwo/SelectPrjTwo";
import Date from "./components/Date";
import SelectPrjThree from "./page/SelectPrjThree/SelectPrjThree";
import UserFunding from "./page/UserFunding/UserFunding";
import UserIng from "./page/UserIng/UserIng";
import UserCompleted from "./page/UserCompleted/UserCompleted";
import PrjAll from "./page/PrjAll/PrjAll";
// import ProductDetail from "./page/MainProduct/ProductDetail";
import Announcement from "./page/noticpage/Announcement";

import ProfileEdit from "./page/Profile/ProfileEdit";
import Profile from "./container/Profile/Profile";
import CreationGuide from "./page/noticpage/CreationGuide";
import DonateGuide from "./page/noticpage/DonateGuide";
import ProfileView from "./page/Profile/ProfileView";
import MainProDetails from "./page/MainProDetails/MainProDetails";
import OrderTable from "./page/OrderTable/OrderTable";
import AddressSearchModal from './components/Refunded/AddressSearchModal'

import CommunityWrite from './page/Admin/features/community/CommunityWrite'
import ChargePolicy from "./page/noticpage/ChargePolicy";
import TermsOfService from "./page/noticpage/TermsOfService";
import PrivacyPolicy from "./page/noticpage/PrivacyPolicy";


// 어드민

import AdminHeader from './page/Admin/components/Header/AdminHeader'
import SidebarLayout from "./page/Admin/components/Sidebar/SidebarLayout";
import AdminLayout from "./page/Admin/Layout";
import AdminQnaPage from "./page/Admin/features/Qna/AdminQnaPage";



import FundingPay from "./page/FundingPay/FundingPay";
import AdminMainPage from "./page/admin/features/Main/AdminMainPage"
import AdminNoticePage from "./page/admin/features/community/communityPage/AdminNoticePage";
import AdminEventPage from "./page/admin/features/community/communityPage/AdminEventPage";
import UserManagementPage from "./page/admin/features/user/UserManagementPage";
import ProjectManagementPage from "./page/admin/features/Project/ProjectManagementPage";
import QnaPage from "./page/admin/features/QnaPage/QnaPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/home",
    element: <Main />,
    children: [
      { index: true, element: <Product /> },
      { path: "upcoming", element: <Product /> },
      { path: "active", element: <Product /> },
      { path: "write-qna", element: <WriteQnA /> },
      { path: "login", element: <Login /> },
      { path: "FindAccount", element: <FindAccount /> },
      { path: "SignupForm", element: <SignupForm /> },
      {
        path: "myqna",
        element: <MyQnA />, // 부모 컴포넌트
        children: [
          { index: true, element: <QnAListPage /> }, // 기본 경로에 목록 표시
          { path: ":id", element: <QnAView /> }, // 상세 경로
        ],
      },

      // 사용자 커뮤니티 / 공지사항
      { path: "notice", element: <NoticePage /> },
      { path: "inquiry", element: <NoticePage/>},
      { path: "announcement/:communityNum", element: <Announcement /> },
      { path: "inquiry/:qnaNum", element: <Announcement /> }, // 나의 문의 내역
      { path: "inquiry/:userNum/write", element: <CommunityWrite/>}, // 1:1 문의하기 
      // { path:"/productDetail", element:<ProductDetail/>},
      {
        path: "myfunding",
        element: <MyFunding />, // 부모 컴포넌트
        children: [
          { index: true, element: <Upcoming /> },
          { path: "ongoing", element: <Ongoing/> },
          { path: "completed", element: <Completed /> },
        ],
      },

      {
        path: "selectPrj",
        element: <SelectPrj />, // 부모 컴포넌트
        children: [
          { index: true, element: <SelectPrjOne /> },
          { path: "prj-two", element: <SelectPrjTwo /> },
          { path: "prj-three", element: <SelectPrjThree /> },
        ],
      },

      {
        path: "selectPrj/edit/:projectNum",
        element: <SelectPrj />, // 부모 컴포넌트
        children: [
          { index: true, element: <SelectPrjOne /> },
          { path: "prj-two", element: <SelectPrjTwo /> },
          { path: "prj-three", element: <SelectPrjThree /> },
        ],
      },

      {
        path: "userfunding",
        element: <UserFunding />, // 부모 컴포넌트
        children: [
          { index: true, element: <UserIng /> },
          { path: "user-completed", element: <UserCompleted /> },
        ],
      },
      { path: "create-apply", element: <CreatorApply /> },
      { path: "profile/:userNum", element: <ProfileView /> },
      { path: "profile-edit/:userNum", element: <ProfileEdit /> },

      // 푸터로 연결되는 정책, 이용안내
      { path: "creation-guide", element: <CreationGuide /> }, //창작가이드
      { path: "donate-guide", element: <DonateGuide /> }, // 후원 가이드
      { path: "charge", element: <ChargePolicy /> }, // 수수료 
      {path:"useterms", element:<TermsOfService/>}, // 이용약관
      {path:"privacypolicy", element:<PrivacyPolicy/>}, // 개인정보처리
      { path: "product-details/:projectNum", element: <MainProDetails /> },


      { path: "ordertable/:projectNum", element: <OrderTable /> },
      { path: "fundingpay", element: <FundingPay />},
      // { path: "investment", element: <Investment />}


    ],
  },
  {
    path: "/admin",
    element : <AdminLayout/>,
    children: [
      { index: true, element: <AdminMainPage/>},

      // 관리자 공지사항 / 커뮤니티
      {path : "community/notice-faq", element:<AdminNoticePage/> }, //공지사항/FAQ 목록
      {path : "community/event", element:<AdminEventPage/> }, // 이벤트 목록
      { path: "community/write", element: <CommunityWrite/>}, // 공자사항/ faq/ 이벤트 작성
      {
        path: "community",
        children: [
          { path: "notice-faq", element: <AdminNoticePage /> },
          { path: "event", element: <AdminEventPage /> },
          { path: "edit/:communityNumber", element: <CommunityWrite /> },
        ],
      },

      {
        path: "user",
        children: [
          { path: "user-management", element: <UserManagementPage/> },
          // { path: "event", element: <AdminEventPage /> },
          // { path: "edit/:communityNumber", element: <CommunityWrite /> },
        ],
      },
      {
        path: "project",
        children: [
          { path: "project-management", element: <ProjectManagementPage/> },
          // { path: "event", element: <AdminEventPage /> },
          // { path: "edit/:communityNumber", element: <CommunityWrite /> },
        ],
      },






      // Qna
      // { path:"qna/waiting", element: <AdminQnaPage/>},
      // { path:"qna/completed", element: <AdminQnaPage/>},

    ]
    }

//   // { path: "/write", element: <CommunityWrite /> } ,
//   {path : "/address", element:<AddressSearchModal/> }
// ]);
//       //   ],
//       // },
//       // {path:"create-apply", element:<CreatorApply/> },
//       // {path:"profile/:userNum", element:<ProfileView/> },
//       // {path:"profile-edit/:userNum", element:<ProfileEdit/> },

//       // {path:"creation-guide", element:<CreationGuide/>},
//       // {path:"donate-guide", element:<DonateGuide/>},
//       // {path :"product-details", element:<MainProDetails/> },

// //   //   ]},




])

function App() {
   useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("user"); // 종료 시 초기화
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 라우터 경로
  return <RouterProvider router={router} />;
    // return (<QnaPage /> )
}

export default App;
