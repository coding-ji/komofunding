import { useEffect } from 'react';
import { useStore as ProjectStore } from '../../stores/ProjectStore/useStore'
import TopSection from '../../container/Home/TopSection/TopSection';
import ImageSection from '../../container/Home/ImageSection/ImageSection';
import GuideSection from '../../container/Home/GuideSection/GuideSection';
import Footer from "../../components/Footer/Footer";
import MembersSection from '../../container/Home/MembersSection/MembersSection';

const HomePage = () => {
  const { state, actions } = ProjectStore();  // useStore를 사용하여 상태와 액션을 가져옵니다.

  useEffect(() => {
    // 프로젝트 목록을 불러옵니다.
    actions.readProjects();
   }, [actions]);

  // 로딩 중일 때
  if (state.loading) return <div>로딩 중...</div>;

  // 에러가 있을 때
  if (state.error) return <div>에러 발생: {state.error.message}</div>;

  console.log(state);
  return (
    <>
      <TopSection datas={["1","2"]} />  {/* state.projects에 저장된 데이터 사용 */}
      <ImageSection />
      <GuideSection />
      <MembersSection />
      <Footer />
    </>
  );
};

export default HomePage;