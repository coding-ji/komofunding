import styled from "styled-components"
import AdminTabs from "../../components/AdminTabs/AdminTabs";

const Container = styled.div `
`


const navItems = [
    { name: "답변대기", path: "/admin/waiting" },
    { name: "답변완료", path: "/admin/completed" },
  ];
  
function QnaPage(){
    return(
        <Container>
            <AdminTabs navItems= {navItems} />
            <Outlet />
        </Container>
    )
}

export default QnaPage;