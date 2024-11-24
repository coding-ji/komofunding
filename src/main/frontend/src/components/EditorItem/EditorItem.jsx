import React, { useRef, useEffect, useState, useMemo } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill 스타일을 임포트
import axios from 'axios'; // axios 임포트
import './EditorItem.css'; // CSS를 임포트

const Editor = () => {
  const editorRef = useRef(null); // Quill을 사용할 DOM 참조
  const quillRef = useRef(null); // Quill 인스턴스를 useRef로 관리
  const [isQuillReady, setIsQuillReady] = useState(false); // Quill 초기화 완료 여부
  const [editorContent, setEditorContent] = useState("");

  // 툴바 옵션 세팅
  const toolbarOptions = useMemo(() => [
    [{ size: ['huge', 'large', false, 'small'] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['image'],
    [{ 'color': [] }, { 'background': [] }],
  ], []);

  // 이미지 핸들러 함수(img는 temp에 저장되고(원래는 서버 클라우드에 저장), 해당하는 temp를 불러옴)
  // const imageHandler = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.addEventListener("change", async () => {
  //     const file = input.files[0];
  //     const formData = new FormData();
  //     formData.append('file', file);  // 서버에서 'file'로 받는다고 가정

  //     try {
  //       // 이미지 업로드 서버로 POST 요청 보내기
  //       const response = await axios.post('http://localhost:8080/uploadFile', formData, {
  //         headers: { 'Content-Type': 'multipart/form-data' }
  //       });

  //       // 서버에서 반환한 이미지 URL
  //       //  String imageUrl = "http://localhost:8080/images/" + savedFilename;  // 예시 경로
  //       const IMG_URL = response.data.imageUrl;

  //       if (IMG_URL) {
  //         // 커서 위치에 이미지를 삽입
  //         const range = quillRef.current.getSelection();
  //         if (range) {
  //           quillRef.current.insertEmbed(range.index, 'image', IMG_URL);
  //         } else {
  //           console.error('커서 위치를 가져올 수 없습니다.');
  //         }
  //       } else {
  //         console.error('서버에서 이미지 URL을 반환하지 않았습니다.');
  //       }
  //     } catch (error) {
  //       console.log("이미지를 삽입하는데 실패했습니다.", error);
  //     }
  //   });
  // };

  // 모듈 설정 ( 나중에 서버랑 연동할때 모듈 이렇게 설정!!!!!!!!!!! )
  // const modules = useMemo(() => ({
  //   toolbar: {
  //     container: toolbarOptions,
  //     handlers: {
  //       'image': imageHandler, // 이미지 버튼 클릭 시에 핸들러 연결
  //     },
  //   },
  // }), [toolbarOptions]);

  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
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

      // 텍스트가 변경될 때마다 HTML 업데이트
      quillInstance.on('text-change', () => {
        setEditorContent(quillInstance.root.innerHTML);
      });
    }

    // 언마운트 시에 editorRef null로 변경
    return () => {
      if (editorRef.current) {
        editorRef.current = null;
      }
    };
  }, [modules, isQuillReady]);

  // Quill은 delta 형식으로 데이터를 다룸
  const handleSave = () => {
    if (quillRef.current) {
      const deltaContent = quillRef.current.getContents();
      console.log(JSON.stringify(deltaContent)); // delta 형식의 데이터 출력
      // 서버로 데이터 전송 로직을 추가할 수 있습니다.
    }
  };

  // 취소 버튼 클릭 시 처리할 함수
  const handleCancel = () => {
    // 에디터 내용을 초기화하는 로직
    setEditorContent("");  // 내용 초기화
    console.log("내용이 취소되었습니다.");
  };

  return (
    <div>
      <div ref={editorRef}></div>
      <div className='button-container'>
        <button onClick={handleSave}>등록</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

export default Editor;