import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
// import MainHeader from './container/MainHeader'
// import ProductMoreBtn from './components/ProductMoreBtn'
// import InnerProduct from './components/InnerProduct'
// import Label from './components/Label'
// import Notification from './components/Notification'
import MainProductContainer from './container/MainProductCard/MainProductContainer'
// import Footer from './components/Footer/Footer'
// import Navbar from './components/NavBar/Navbar'
import Announcement from './page/Announcement'

import TitleText from './components/TitleText'
import RichTextEditor from './components/RichTextEditor'
import Inquiry from './page/Inquiry/Inquiry'
import Editor from './components/EditorItem/EditorItem'
import PopularProducts from './components/PopularProducts/PopularProducts'
import Product from './page/MainProduct/Product'
import MyInquiryPage from './page/MyInquiry/MyInquiryPage'

import NoticePage from './page/noticpage/NoticePage';
import Note from './page/noticpage/PageInPage/Note';
import Create from './page/noticpage/PageInPage/Create';
import Donate from './page/noticpage/PageInPage/Donate';
import Userterms from './page/noticpage/PageInPage/Userterms';
import Privacypolicy from './page/noticpage/PageInPage/Privacypolicy';
import Charge from './page/noticpage/PageInPage/Charge';
import Question from './page/noticpage/PageInPage/Question';
import Notification from './components/Notification'
function App() {
  return (
    <>

      {/* <MainHeader/> */}


      {/* <MainProductContainer/> */}
      {/* <Footer/> */}


      {/* <MainProductContainer/> */}



      {/* <TitleText title="안녕하세요" /> */}
      {/* <RichTextEditor/> */}

      {/* <Editor/> */}
      {/*  */}
 
        {/* <Inquiry /> */}


      {/* <PopularProducts/> */}

        {/* <Product/>  */}


      {/* <MyInquiryHistoryList/> */}
      {/* <Notification/> */}
      <MyInquiryPage/>

      {/* <Routes>
      <Route path="/" element={<NoticePage />} /> 
      <Route path="/note" element={<Note />} />
      <Route path="/question" element={<Question />} />
      <Route path="/create" element={<Create />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/useterms" element={<Userterms />} />
      <Route path="/privacypolicy" element={<Privacypolicy />} />
      <Route path="/charge" element={<Charge />} />
    </Routes> */}


    </>
  )
}

export default App
