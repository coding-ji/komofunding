import React from "react";
import styles from "./Footer.module.css";
import { Link, useNavigate } from "react-router-dom";


const Footer = () => {

    const navigate = useNavigate();

    const handleInquiryClick = () => {
        const user = JSON.parse(localStorage.getItem("user")); // 로그인 여부 확인
        if (user) {
            navigate(`/home/inquiry/${user.userNum}/write`); // 로그인 O → 문의 등록 페이지 이동
        } else {
            alert("로그인 해주세요.");
            navigate("/home/login"); // 로그인 X → 로그인 페이지로 이동
        }
    };

    return (
        <div className={styles.container}>
                <div className={styles.menu1}>
                    <div className={{ fontSize: "20px", fontWeight: "bold" }}>이용 안내</div>
                    <ul className={{ fontSize: "15px"}}>
                            <li className={styles.li}><Link to="/home/notice" className={styles.linkcss}>공지사항</Link></li>
                            <li className={styles.li}>
                            <a onClick={handleInquiryClick} className={styles.linkcss}>문의등록</a>
                            </li>
                            <li className={styles.li}><Link to="/home/creation-guide" className={styles.linkcss}>창작 가이드</Link></li>
                            <li className={styles.li}><Link to="/home/donate-guide" className={styles.linkcss}>후원 가이드</Link></li>
                    </ul>
                </div>
                <div className={styles.menu2}>
                    <div className={{ fontSize: "20px", fontWeight: "bold" }}>정책</div>
                    <ul className={{ fontSize: "15px" }}>
                        <li className={styles.li}><Link to="/home/useterms" className={styles.linkcss}>이용약관</Link></li>
                        <li className={styles.li}><Link to="/home/privacypolicy" className={styles.linkcss}>개인정보처리방침</Link></li>
                        <li className={styles.li}><Link to="/home/charge" className={styles.linkcss}>수수료 안내</Link></li>
                    </ul>
                </div>
                <div className={styles.text}>
                    <div>
                        코모(주) I 대표이사 코스모 I 사업자 등록 번호 I xxx-xx-xxxxx I 통신판매업 신고번호 2024-서울가산-xxxx호 I 서울 금천구 가산디지털 2로 101 한라원앤원타워 B동 3층 306호 I 메일주소 kosmo147@kosmo.com
                    </div>
                    <div>
                        일부 상품의 경우, KOMO FUNDING은 통신판매중개자로서 거래 책임은 판매자에게 있습니다. 사이트 내 정보의 무단 복제, 전송, 배포, 크롤링, 스크래핑 등은 관련 법령에 의해 금지됩니다.
                    </div>
                    <div>
                        KOMO FUNDING은 플랫폼 제공자로서 프로젝트의 당사자가 아니며, 직접적인 통신판매를 진행하지 않습니다. 프로젝트의 완수와 선물 제공에 대한 책임은 창작자에게 있으며, 후원자와의 법적 분쟁 책임 또한 창작자에게 있습니다.
                    </div>
                </div>
                <div className={styles.logo}>
                    <hr className={styles.logohr1}/>
                    <div className={styles.logohead}>KOMO FUNDING</div>
                    <hr className={styles.logohr2}/>
                </div>
                <div className={styles.logocopylight}>© 2024 KOMO FUNDING.All rights reserved</div>
        </div>
    )
}

export default Footer;

// page에 들어갈 router 문구
// function App() {
//     return (
//       <>
//         <Routes>
//           <Route path="/note" element={<Note />} />     {/* 공지사항 페이지 */}
//           <Route path="/question" element={<Question />} /> {/* 문의등록 페이지 */}
//           <Route path="/create" element={<Create />} />     {/* 창작 가이드 페이지 */}
//           <Route path="/donate" element={<Donate />} />     {/* 후원 가이드 페이지 */}
//           <Route path="/useterms" element={<Userterms />} /> {/* 이용약관 페이지 */}
//           <Route path="/privacypolicy" element={<Privacypolicy />} /> {/* 개인정보 처리방침 페이지 */}
//           <Route path="/charge" element={<Charge />} />     {/* 수수료 안내 페이지 */}
//         </Routes>
//         <Footer />
//       </>
//     )
//   }