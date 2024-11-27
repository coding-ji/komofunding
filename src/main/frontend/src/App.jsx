import './App.css'
import { createBrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Main from "./page/Main/Main";
import MainProductContainer from './container/MainProductCard/MainProductContainer'
import { RouterProvider } from 'react-router-dom';

import QnAView from './page/MyQnA/QnAView';
import QnAListPage from './page/MyQnA/QnAListPage';
import MyQnA from './page/MyQnA/MyQnA';
import WriteQnA from './page/writeQnA/WriteQnA';

const router = createBrowserRouter([
  {path: "/", element: <Main/>, 
    children: [
      {path: "/", element: <MainProductContainer/>},
      {path: "/write-qna", element: <WriteQnA/>},
      {
        path: "/myqna",
        element: <MyQnA/>, // 부모 컴포넌트
        children: [
          { index: true, element: <QnAListPage /> }, // 기본 경로에 목록 표시
          { path: ":id", element: <QnAView /> }, // 상세 경로
        ],
      },
    ]}
])

function App() {
  return (
    <>

    <RouterProvider router={router}/>
    {/* <MyInquiryPage/> */}
   

      
    </>

  )
}

export default App
