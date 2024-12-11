import React, { useState, useEffect } from 'react';
import styles from './WriteForm.module.css';
import Dropdown from '../../../components/Dropdown/Dropdown';


const WriteForm = ({ action, state }) => {
    // useState로 상태 관리
    const [formData, setFormData] = useState({
        communityCategory: state.communityCategory || '',
        communityTitle: state.communityTitle || '',
        author: state.author || '',
        isHidden: state.isHidden || false,
        endDate: state.endDate || '',
    });

    // 상태가 변경될 때마다 action을 호출하여 Store에 값 업데이트
    useEffect(() => {
        action.changeCommunityCategory(formData.communityCategory);
        action.changeCommunityTitle(formData.communityTitle);
        action.changeAuthor(formData.author);
        action.changeIsHidden(formData.isHidden);
        action.changeEndDate(formData.endDate);
        
    }, [formData]);

    // input 변경 핸들러
    const handleInputChange = (key, value) => {
        let formattedValue = value;
        if (key === 'endDate') {
            formattedValue = `${value}T00:00:00`; // ISO-8601 형식으로 변환
        }
        setFormData((prev) => ({
            ...prev,
            [key]: formattedValue,
        }));
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.row}>
                <label>카테고리</label>
                <Dropdown
                    options={['NOTICE', 'EVENT', 'FAQ']}
                    defaultValue={formData.communityCategory}
                    onSelect={(value) => handleInputChange('communityCategory', value)}
                />
            </div>
            <div className={styles.row}>
                <label>제목</label>
                <input
                    type="text"
                    value={formData.communityTitle}
                    onChange={(e) => handleInputChange('communityTitle', e.target.value)}
                />
            </div>
            <div className={styles.row}>
                <label>작성자</label>
                <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                />
            </div>
            <div className={styles.row}>
                <label>공개 설정</label>
                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={!formData.isHidden}
                        onChange={() => handleInputChange('isHidden', false)}
                    />
                    공개
                </label>
                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={formData.isHidden}
                        onChange={() => handleInputChange('isHidden', true)}
                    />
                    비공개
                </label>
            </div>
            <div className={styles.row}>
                <label>마감일</label>
                <input
                    type="date"
                    value={formData.endDate.split('T')[0] || ''}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
            </div>
        </div>
    );
};

export default WriteForm;
