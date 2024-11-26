import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill의 기본 테마

const RichTextEditor = ({ onChange }) => {
    const editorRef = useRef(null);
    const [quillInstance, setQuillInstance] = useState(null);

    useEffect(() => {
        if (!quillInstance) {
            const quill = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['clean'],
                    ],
                },
            });

            // 텍스트 변경 이벤트 리스너 추가
            quill.on('text-change', () => {
                const content = quill.root.innerHTML; // HTML 형식으로 내용 가져오기
                onChange(content); // 부모 컴포넌트로 전달
            });

            setQuillInstance(quill);
        }

        return () => {
            if (quillInstance) {
                quillInstance.off('text-change'); // 이벤트 정리
                quillInstance.root.innerHTML = ''; // 기존 내용 제거
            }
        };
    }, [quillInstance, onChange]);

    return (
        <div>
            <div ref={editorRef} style={{ height: '300px', background: '#fff' }} />
        </div>
    );
};

export default RichTextEditor;
