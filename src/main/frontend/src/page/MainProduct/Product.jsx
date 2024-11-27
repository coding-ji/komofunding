
import PopularProducts from "../../components/PopularProducts/PopularProducts"
import MainProductContainer from "../../container/MainProductCard/MainProductContainer"
import Navbar from '../../components/NavBar/Navbar'



function Product(){

    return(
        <>

            <PopularProducts/>
            <Navbar/>
            <MainProductContainer/>

        </>
    )
}


export default Product;

// import { BrowserRouter } from 'react-router-dom' ;
// 이거 임포트 해줘야함

// <BrowserRouter>
// <Product/> 
// </BrowserRouter>