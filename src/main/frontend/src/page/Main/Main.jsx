import Header from "../../container/MainHeader";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Main() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Main;