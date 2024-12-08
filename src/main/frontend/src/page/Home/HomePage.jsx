import TopSection from '../../container/Home/TopSection/TopSection'
import ImageSection from '../../container/Home/ImageSection/ImageSection'
import GuideSection from '../../container/Home/GuideSection/GuideSection'
import Footer from "../../components/Footer/Footer";
import MembersSection from '../../container/Home/MembersSection/MembersSection';
import { useEffect, useState } from 'react';
import { fetchProjects } from "../../service/apiService";

const HomePage = () => {
  const [datas, setDatas] = useState([]); // 프로젝트 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    fetchProjects()
      .then(response => {
        setDatas(response.data);
        setLoading(false); // 데이터 로딩 완료
      })
      .catch(error => {
        console.error("Error fetching projects: ", error); // 오류 로그
        setError(error); // 에러 상태 업데이트
        setLoading(false); // 로딩 종료
      });
  }, []);

  // 로딩 중일 때
  if (loading) return <div>로딩 중...</div>;

  // 에러가 있을 때
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <>
      <TopSection datas={datas}/>
      <ImageSection />
      <GuideSection />
      <MembersSection />
      <Footer />
    </>
  );
};

export default HomePage;