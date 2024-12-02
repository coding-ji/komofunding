

import TopSection from '../../container/Home/TopSection/TopSection'
import ImageSection from '../../container/Home/ImageSection/ImageSection'
import GuideSection from '../../container/Home/GuideSection/GuideSection'
import Footer from "../../components/Footer/Footer";
import MembersSection from '../../container/Home/MembersSection/MembersSection';


const HomePage = () => {
  return (
   <>
    <TopSection/>
    <ImageSection/>
    <GuideSection/>
    <MembersSection/> 
    <Footer/>
   </>
  );
};

export default HomePage;
