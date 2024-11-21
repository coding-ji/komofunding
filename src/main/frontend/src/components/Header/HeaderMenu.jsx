import React from "react";
import styled from "styled-components";
import {motion} from 'framer-motion'

// 메뉴 스타일
const MenuItem = styled(motion.a)`
    text-decoration: none;
    color: #fff;
    font-size: 20px;

    line-height: normal;
    font-family : var(--eng-bold);
    letter-spacing : 0

  }
`;

// HeaderMenu 컴포넌트
const HeaderMenu = ({ name, href }) => {
    return <MenuItem href={href}
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
    >{name}</MenuItem>;
};

export default HeaderMenu;
