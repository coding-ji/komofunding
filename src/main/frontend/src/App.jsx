import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyNav from "./components/MyNav";
import Upcoming from "./page/Upcoming/Upcoming";
import Ongoing from "./page/Ongoing/Ongoing";
import Completed from "./page/Completed/Completed";
import MyQnA from "./page/MyQnA/MyQnA";
import Main from "./page/Main/Main";
import Product from "./page/MainProduct/Product";
import WriteQnA from "./page/writeQnA/WriteQnA";
import QnAListPage from "./page/MyQnA/QnAListPage";
import QnAView from "./page/MyQnA/QnAView";
import MyFunding from "./page/MyFunding/MyFunding";
import MainMenu from "./components/MainMenu/MainMenu";


const router = createBrowserRouter([
  {path: "/", element: <Main/>, 
    children: [
      {path: "/", element: <Product/>},
      {path: "/write-qna", element: <WriteQnA/>},
      {
        path: "/myqna",
        element: <MyQnA/>, // 부모 컴포넌트
        children: [
          { index: true, element: <QnAListPage /> }, // 기본 경로에 목록 표시
          { path: ":id", element: <QnAView /> }, // 상세 경로
        ],
      },
      {
        path: "/myfunding",
        element: <MyFunding/>, // 부모 컴포넌트
        children: [
          { index:true, element: <Upcoming /> },
          { path: "ongoing", element: <Ongoing />},
          { path: "completed", element: <Completed />}
        ],
      },

    ]}
])

function App() {
 return <RouterProvider router={router} />;


      
    </>

  )
}

export default App
