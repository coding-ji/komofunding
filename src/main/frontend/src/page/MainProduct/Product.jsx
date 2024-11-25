import MainHeader from "../../container/MainHeader"
import PopularProducts from "../../components/PopularProducts/PopularProducts"
import MainProductContainer from "../../container/MainProductCard/MainProductContainer"
import Navbar from '../../components/NavBar/Navbar'
import Footer from '../../components/Footer/Footer'


function Product(){

    return(
        <>
            <MainHeader/>
            <PopularProducts/>
            <Navbar/>
            <MainProductContainer/>
            <Footer/>
        </>
    )
}


export default Product

// <BrowserRouter>
// <Product/> 
// </BrowserRouter>