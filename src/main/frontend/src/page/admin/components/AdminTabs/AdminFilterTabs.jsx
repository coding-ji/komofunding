import styled from "styled-components";

const StyledTab = styled.div`
  width: ${({ width }) => width || "100%"};
  background: #080404;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 2px;s
  gap: 40px;
  margin : 10px 0;
`;

const TabItem = styled.div`
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")}; // 활성화된 탭은 볼드
  opacity: ${({ isActive }) => (isActive ? "1" : "0.6")}; // 활성화된 탭은 불투명, 비활성화는 투명도 적용
    color: #ffffff; // 기본 색상 흰색
  font-size: 1.3rem;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  margin : 2rem ;
`;

function AdminFilterTabs({ navItems, width, activeTab, onTabClick }) {
  return (
    <StyledTab width={width}>
      {navItems.map((item, index) => (
        <TabItem
          key={index}
          isActive={activeTab === item.name} // 활성화 상태 확인
          onClick={() => {
            console.log("Tab Clicked:", item.name); // 디버깅용
            onTabClick(item.name); // 클릭된 탭의 이름 전달
          }}
        >
          {item.label} {/* 사용자에게 보여질 텍스트 */}
        </TabItem>
      ))}
    </StyledTab>
  );
}

export default AdminFilterTabs;
