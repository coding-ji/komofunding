import React from "react";
import styles from "./FooterSmall.module.css";
import { Link } from "react-router-dom";


const FooterSmall = () => {

    return (
        <div className={styles.container}>
                    <ul className={styles.ul}>
                        <li><Link to="/useterms" className={styles.linkcss}>이용약관</Link></li>
                        <li><Link to="/privacypolicy" className={styles.linkcss}>개인정보처리방침</Link></li>
                        <li><Link to="/charge" className={styles.linkcss}>수수료 안내</Link></li>
                        <li><Link to="/question" className={styles.linkcss}>문의등록</Link></li>
                    </ul>
                    <div className={styles.logocopylight}>© 2024 KOMO FUNDING.All rights reserved</div>
        </div>
    )
}

export default FooterSmall;


// page에 들어갈 router 문구
// function App() {
//     return (
//       <>
//         <Routes>
//           <Route path="/useterms" element={<Userterms />} /> {/* 이용약관 페이지 */}
//           <Route path="/privacypolicy" element={<Privacypolicy />} /> {/* 개인정보 처리방침 페이지 */}
//           <Route path="/charge" element={<Charge />} />     {/* 수수료 안내 페이지 */}
//           <Route path="/question" element={<Question />} /> {/* 문의등록 페이지 */}
//         </Routes>
//         <Footer />
//       </>
//     )
//   }