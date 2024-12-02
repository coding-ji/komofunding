import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import HomePage from './page/Home/HomePage'
import NoticePage from './page/noticpage/NoticePage'
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


const router = createBrowserRouter([
  {path: "/", element: <Main/>, 
    children: [
      {path: "/", element: <Product/>},
      {path: "/write-qna", element: <WriteQnA/>},
      {path: "/login", element: <Login/>},
      {path: "/FindAccount", element: <FindAccount/>},
      {path: "/SignupForm", element: <SignupForm/>},
      {
        path: "/myqna",
        element: <MyQnA/>, // 부모 컴포넌트
        children: [
          { index: true, element: <QnAListPage /> }, // 기본 경로에 목록 표시
          { path: ":id", element: <QnAView /> }, // 상세 경로
        ],
      },
      { path:"/notice", element:<NoticePage/>},
      {
        path: "/myfunding",
        element: <MyFunding/>, // 부모 컴포넌트
        children: [
          { index:true, element: <Upcoming /> },
          { path: "ongoing", element: <Ongoing />},
          { path: "completed", element: <Completed />}
        ],
      },

      {
        path: "/selectPrj",
        element: <SelectPrj />, // 부모 컴포넌트
        children: [
          { index:true, element: <SelectPrjOne /> },
          { path:"prj-two", element: <SelectPrjTwo /> },
          { path:"prj-three", element: <SelectPrjThree /> },



        ],
      },

      {
        path: "/userfunding",
        element: <UserFunding />  , // 부모 컴포넌트
        children: [
          { index:true, element: <UserIng /> },
          { path:"user-completed", element: <UserCompleted /> },

        ],
      },


    ]},
    {path : "/home", element:<HomePage/> }
])

function App() {
 return <RouterProvider router={router} />;
// return (<Date /> )


      
    

  
}

export default App
