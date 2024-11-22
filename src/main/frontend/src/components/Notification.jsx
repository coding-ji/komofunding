import styled from "styled-components";
import { motion } from 'framer-motion';

const Note = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 942px;
    height: 109px;
    padding: 15px 37px;
    gap: 10px 708px;
    border-radius: 2px;
    border: 1px solid #E4E4E4;
    cursor: pointer;

    @media (max-width: 1024px) {
        padding: 10px 25px;
        gap: 10px 20px;
    }

    @media (max-width: 768px) {
        padding: 10px 15px;
        gap: 10px 15px;
    }

    @media (max-width: 480px) {
        padding: 10px;
        gap: 5px;
        height: auto;
    }
`;

const Notep = styled.p`
    color: #256E91;
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;

    @media (max-width: 1024px) {
        font-size: 14px;
    }

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;

const NoteTitle = styled.h1`
    color: var(--user-mainHome, #282828);
    font-family: "Noto Sans KR";
    font-size: 30px;
    font-weight: 700;
    line-height: 43px;

    @media (max-width: 1024px) {
        font-size: 26px;
    }

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;

const Notification = ({props}) => {
    return (
        <motion.div
            whileHover={{
                scale: 1.03,
                boxShadow: '10px 10px 20px #282828',
                transition: { duration: 0.3 }
            }}
            style={{
                width: '100%',
                maxWidth: '942px',
                height: '109px',
                transformOrigin: 'center',
            }}>
            <Note>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Notep>{props.category}</Notep>
                    <Notep>{props.date_author}</Notep>
                </div>
                <NoteTitle>{props.title}</NoteTitle>
            </Note>
        </motion.div>
    )
}

export default Notification;
