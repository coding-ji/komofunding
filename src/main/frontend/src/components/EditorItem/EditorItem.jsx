import React, { useRef, useEffect, useState, useMemo } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill 스타일을 임포트
import axios from 'axios'; // axios 임포트
import './EditorItem.css'; // CSS를 임포트

const EditorItem = ({ content, setContent, quillRef }) => {
  const editorRef = useRef(null); // Quill을 사용할 DOM 참조
  const [isQuillReady, setIsQuillReady] = useState(false); // Quill 초기화 완료 여부

  // 툴바 옵션 세팅
  const toolbarOptions = useMemo(() => [
    [{ size: ['huge', 'large', false, 'small'] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['image'],
    [{ 'color': [] }, { 'background': [] }],
  ], []);

  // 이미지 핸들러
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        // 이미지 저장 요청 보내기
        const response = await axios.post('http://localhost:8080/saveImg', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        // 서버에서 반환된 이미지 URL
        const imageUrl = response.data;  // 서버가 imageUrl을 직접 반환한다고 가정

        if (imageUrl) {
          const range = quillRef.current.getSelection();
          if (range) {
            // 이미지 삽입
            quillRef.current.insertEmbed(range.index, 'image', imageUrl);
          }
        }
      } catch (error) {
        console.error('이미지 업로드 실패', error);
      }
    });
  };

  // 모듈 설정(나중에 서버랑 연동할때 모듈 설정)
  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
      handlers: {
        'image': imageHandler, // 이미지 버튼 클릭 시에 핸들러 연결
      },
    },
  }), [toolbarOptions]);

  useEffect(() => {
    if (editorRef.current && !isQuillReady) {
      // Quill 초기화
      const quillInstance = new Quill(editorRef.current, {
        theme: 'snow',
        modules: modules,
      });
      quillRef.current = quillInstance; // Quill 인스턴스를 useRef에 할당
      setIsQuillReady(true); // Quill 초기화 완료

      // 에디터 내용이 변경될 때마다 부모 컴포넌트로 값 전달
      quillInstance.on('text-change', () => {
        const html = quillInstance.root.innerHTML;
        setContent(html); // 부모로 값 전달
      });

      // 초기 content를 Quill 에디터에 설정
      if (content) {
        quillInstance.root.innerHTML = content;
      }
    }

    return () => {
      if (editorRef.current) {
        editorRef.current = null;
      }
    };
  }, [modules, isQuillReady, content]); // editorContent도 의존성에 추가

  return (
    <div>
      <div ref={editorRef}></div>
    </div>
  );
};

export default EditorItem;
