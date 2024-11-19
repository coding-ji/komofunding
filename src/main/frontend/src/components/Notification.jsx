import styled from "styled-components";
import { motion } from 'framer-motion';


const Note = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 942px;
    height: 109px;
    padding: 15px 37px;
    gap: 10px 708px;
    border-radius: 2px;
    border: 1px solid #E4E4E4;
    cursor: pointer;
`
const Notep = styled.p`
    color: #256E91;
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`
const NoteTitle = styled.h1`
    Item-Title Flex-ItemList
    color: var(--user-mainHome, #282828);
    font-family: "Noto Sans KR";
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 43px;
`

const Notification = ({props}) => {
    return (
        <motion.div
            whileHover={{
                scale: 1.03,
                boxShadow: '10px 10px 20px #282828',
                transition: { duration: 0.3 } }}
            style={{
                width: '942px',
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