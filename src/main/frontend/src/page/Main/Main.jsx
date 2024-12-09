import Header from "../../container/MainHeader";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이 확보 */
`;

const Content = styled.main`
  flex: 1; /* 남은 공간을 채움 */
  display: flex;
  flex-direction: column;
`;

function Main() {
  return (
    <Layout>
      <Header/>
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

export default Main;
