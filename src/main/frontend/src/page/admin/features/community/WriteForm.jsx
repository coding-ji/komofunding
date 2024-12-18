import React, { useState, useEffect } from 'react';
import styles from './WriteForm.module.css';
import Dropdown from '../../../../components/Dropdown/Dropdown';


const WriteForm = ({ actions, state }) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem('user');
        if (storedData) {
            setUserData(JSON.parse(storedData)); // 세션 데이터 파싱
        }
    }, []);


    // 작성자 닉네임 초기화
    const initialAuthor = userData?.adminNickname || '관리자';

    // // useState로 상태 관리
    // const [formData, setFormData] = useState({
    //     communityCategory: state.communityCategory || '',
    //     communityTitle: state.communityTitle || '',
    //     author: initialAuthor,
    //     isHidden: state.isHidden || false,
    //     endDate: state.endDate || '',
    // });

    // // 상태가 변경될 때마다 action을 호출하여 Store에 값 업데이트
    // useEffect(() => {
    //     action.changeCommunityCategory(formData.communityCategory);
    //     action.changeCommunityTitle(formData.communityTitle);
    //     action.changeAuthor(formData.author); // Store 상태 업데이트
    //     action.changeIsHidden(formData.isHidden);
    //     action.changeEndDate(formData.endDate);
        
    // }, [formData]);

    

    // // input 변경 핸들러
    // const handleInputChange = (key, value) => {
    //     let formattedValue = value;
    //     if (key === 'endDate') {
    //         formattedValue = `${value}T00:00:00`; // ISO-8601 형식으로 변환
    //     }
    //     setFormData((prev) => ({
    //         ...prev,
    //         [key]: formattedValue,
    //     }));
    // };

    return (
        <div className={styles.formContainer}>
            <div className={styles.row}>
                <label>카테고리</label>
                <Dropdown
                    options={['NOTICE', 'EVENT', 'FAQ']}
                    defaultValue={state.community && state.community.communityCategory || "NOTICE"}
                    onSelect={(value) => actions.changeCommunityCategory(value)}
                />
            </div>
            <div className={styles.row}>
                <label>제목</label>
                <input
                    type="text"
                    value={state.community && state.community.communityTitle || "" }
                    onChange={(e) => actions.changeCommunityTitle(e.target.value)}
                />
            </div>
            <div className={styles.row}>
                <label>작성자</label>
            
                 <input
                    type="text"
                    value={state.community && state.community.author || initialAuthor}
                    readOnly // 읽기 전용으로 설정
                />
            </div>
            <div className={styles.row}>
                <label>공개 설정</label>
                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={state.community && !state.community.isHidden}
                        onChange={() => actions.changeIsHidden(false)}
                    />
                    공개
                </label>
                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={state.community && state.community.isHidden}
                        onChange={() => actions.changeIsHidden(true)}
                    />
                    비공개
                </label>
            </div>
            <div className={styles.row}>
                <label>마감일</label>
                <input
                    type="date"
                    value={state.community?.endDate ? state.community.endDate.split('T')[0] : ''}
                    onChange={(e) => actions.changeEndDate(e.target.value)}
                />
            </div>
        </div>
    );
};

export default WriteForm;
