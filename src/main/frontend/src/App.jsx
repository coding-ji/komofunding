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
import RefundPage from "./page/RefundPage/RefundPage";

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
      { path: "notice", element: <NoticePage /> },
      { path: "announcement/:id", element: <Announcement /> },
      // { path:"/productDetail", element:<ProductDetail/>},
      {
        path: "myfunding",
        element: <MyFunding />, // 부모 컴포넌트
        children: [
          { index: true, element: <Upcoming /> },
          { path: "ongoing", element: <Ongoing /> },
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

      { path: "creation-guide", element: <CreationGuide /> },
      { path: "donate-guide", element: <DonateGuide /> },
      { path: "product-details", element: <MainProDetails /> },
      { path: "ordertable", element: <OrderTable /> },
      { path: "refund", element: <RefundPage />},
      // { path: "investment", element: <Investment />}

    ],
  },
]);

function App() {
  useEffect(() => {
    // 경로가 "selectPrj"와 관련된 경로가 아닐 경우
    if (!location.pathname.startsWith("/home/selectprj")) {
      // "selectPrj" 경로가 포함되지 않으면 localStorage 지우기
      localStorage.removeItem("projectState");
    }
  }, [location]);

  return <RouterProvider router={router} />;
  // return (<Date /> )
}

export default App;
