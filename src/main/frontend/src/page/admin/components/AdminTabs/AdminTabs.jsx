import styled from "styled-components";
import { Link } from "react-router-dom";
import AdminNavFont from "../../../../components/AdminNavFont";

const StyledTab = styled.div`
  width: ${({width}) => width || "100%"};
  background: #080404;
  height: 100px;
  display: flex;
  align-items : center;
  justify-content : center;
  border-radius: 2px;
  gap: 40px;
`;

function AdminTabs({ navItems, width }) {
  return (
    <StyledTab
    width={width}
    >
      {navItems.map((item, index) => (
        <AdminNavFont key={index} nav={item.name} to={item.path} color="#ffffff" fontSize="1.3rem" />
      ))}
    </StyledTab>
  );
}

export default AdminTabs;
