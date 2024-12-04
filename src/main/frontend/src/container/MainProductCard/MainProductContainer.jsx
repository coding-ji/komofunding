import React, { useEffect } from "react";
import styles from "./MainProductContainer.module.css";
import ProductCardImage from "../../components/ProductCard1/ProductCardImage";
import ProductCard from "../../components/ProductCard1/ProductCard";
import ProductMoreBtn from "../../components/ProductMoreBtn";
import { useState } from "react";
import '../../index.css';
import {useStore} from '../../stores/ProjectStore/useStore'
import axios from "axios";


function MainProductContainer() {

  const { state, actions } = useStore();// 스토어 상태와 액션 가져오기
 const [shuffledProducts, setShuffledProducts] = useState([]);// 무작위 데이터


 useEffect(() => {
  // API에서 데이터 가져오기
  async function fetchData() {
    try {
      const response = await axios.get("data/projectData.json"); // 실제 API 경로 입력
      const projects = response.data;

      // 스토어 상태 업데이트
      actions.changeProjectItems(projects);

      // 데이터를 랜덤으로 섞어서 저장
      setShuffledProducts(shuffleArray(projects));
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  }

  fetchData();
}, []);
 
  // 배열을 랜덤으로 섞는 함수
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const shuffleProjectsHandler = () => {
    setShuffledProducts(shuffleArray(state.items));
  };


  // 섹션별로 나누기
  const topSection = shuffledProducts.slice(0, 5); // 상단 섹션 (5개)
  const middleSection = shuffledProducts[5]; // 중단 섹션 (1개)
  const bottomSection = shuffledProducts.slice(6,9); // 하단 섹션 (나머지)

  return (
    <div className={styles.mainGrid}>
      {/* 상단 섹션 */}
      <div className={styles.topSection}>
        <div className={styles.largeItem}>
        <ProductCard data={topSection[0]} /> {/* 전체 데이터 객체 전달 */}
          <div className={styles.largeBottom}>
            <div className={styles.largeBottomLeft}>
            <ProductCardImage data={topSection[1]} />
            </div>
            <div className={styles.largeBottomRight}>
            <ProductCardImage data={topSection[2]} />
            </div>
          </div>
        </div>
        <div className={styles.rightGrid}>
        {topSection.slice(3).map((item, index) => (
            <ProductCard key={index} data={item} />
          ))}
              <ProductMoreBtn onClick={shuffleProjectsHandler} />
        </div>
      </div>

      {/* 중단 섹션 */}
      <div className={styles.middleSection}>
      {middleSection && (
          <div className={styles.fullWidthItem}>
            <ProductCardImage data={middleSection} />
          </div>
        )}
      </div>

      {/* 하단 섹션 */}
      <div className={styles.bottomSection}>
      {bottomSection.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default MainProductContainer;
