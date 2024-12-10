import React, { useRef, useEffect, useState, useMemo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./EditorItem.css";

const Editor = ({ editorContent, setEditorContent, quillRef }) => {
  const editorRef = useRef(null);
  const [isQuillReady, setIsQuillReady] = useState(false);
  const [blobUrls, setBlobUrls] = useState([]); // Blob URL을 관리할 배열

  const toolbarOptions = useMemo(
    () => [
      [{ size: ["huge", "large", false, "small"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      ["image"],
      [{ color: [] }, { background: [] }],
    ],
    []
  );

  //이미지 핸들러
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) {
        console.error("파일이 선택되지 않았습니다.");
        return;
      }
  
      // Blob URL 생성
      const localImageUrl = URL.createObjectURL(file);
      console.log("Generated Blob URL:", localImageUrl);
  
      // Quill 에디터에 Blob URL 삽입
      const range = quillRef.current.getSelection();
      console.log("Selection range:", range);
  
      // range가 null일 경우 문서 끝에 이미지 삽입
      if (range === null) {
        // 문서 끝에 삽입
        const length = quillRef.current.getLength();
        quillRef.current.insertEmbed(length, "image", localImageUrl);
      } else {
        // 선택된 범위가 있을 경우 그 위치에 이미지 삽입
        quillRef.current.insertEmbed(range.index, "image", localImageUrl);
      }
  
      // 이미지 삽입 후 내용 확인
      console.log("Text after insertion:", quillRef.current.root.innerHTML);
    });
  };
  
  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [toolbarOptions]
  );

  useEffect(() => {
    if (editorRef.current && !isQuillReady) {
      const quillInstance = new Quill(editorRef.current, {
        theme: "snow",
        modules: modules,
      });
      quillRef.current = quillInstance;

      setIsQuillReady(true);
      quillInstance.on("text-change", () => {
        setEditorContent(quillInstance.root.innerHTML);
      });
    }

    return () => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url)); // URL 해제
    };
  }, [modules, isQuillReady, blobUrls]);

  return (
    <div>
      
      <div ref={editorRef}></div>
    </div>
  );
};

export default Editor;

// import React, { useRef, useEffect, useState, useMemo } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import "./EditorItem.css";
// import { useStore as FileStore } from "../../stores/FileStore/useStore";

// const Editor = ({ editorContent, setEditorContent, quillRef }) => {
//   const { store: fileStore, actions: fileActions } = FileStore();
//   const editorRef = useRef(null); // Quill을 사용할 DOM 참조
//   const [isQuillReady, setIsQuillReady] = useState(false); // Quill 초기화 완료 여부

//   // 툴바 옵션 세팅
//   const toolbarOptions = useMemo(
//     () => [
//       [{ size: ["huge", "large", false, "small"] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ align: [] }],
//       ["bold", "italic", "underline", "strike"],
//       ["image"],
//       [{ color: [] }, { background: [] }],
//     ],
//     []
//   );

//   const imageHandler = () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.addEventListener("change", async () => {
//       const file = input.files[0];

//       if (file) {
//         // 로컬 미리보기용 URL 생성
//         const localImageUrl = URL.createObjectURL(file);
//         const range = quillRef.current.getSelection();

//         if (range) {
//           // 미리보기 이미지 삽입
//           quillRef.current.insertEmbed(range.index, "image", localImageUrl);
//         }

//         // 나중에 서버 업로드를 위한 이미지 파일 저장 (최종 저장 시점에서 서버 업로드)
//         const formData = new FormData();
//         formData.append("files", file);

//         try {
//           // 서버로 이미지 업로드
//           const response = await fileActions.createImgData(formData); // 이미지 업로드 API 호출
//           const imageUrl = response; // 서버에서 반환된 이미지 URL

//           if (imageUrl) {
//             // 서버 업로드된 URL로 이미지를 교체
//             const range = quillRef.current.getSelection();
//             if (range) {
//               quillRef.current.insertEmbed(range.index, "image", imageUrl); // 이미지 URL로 교체
//             }
//           }
//         } catch (error) {
//           console.error("이미지 업로드 실패", error);
//         }
//       }
//     });
//   };

//   const modules = useMemo(
//     () => ({
//       toolbar: {
//         container: toolbarOptions,
//         handlers: {
//           image: imageHandler, // 이미지 버튼 클릭 시에 핸들러 연결
//         },
//       },
//     }),
//     [toolbarOptions]
//   );

//   useEffect(() => {
//     if (editorRef.current && !isQuillReady) {
//       // Quill 초기화
//       const quillInstance = new Quill(editorRef.current, {
//         theme: "snow",
//         modules: modules,
//       });
//       quillRef.current = quillInstance; // Quill 인스턴스를 useRef에 할당
//       setIsQuillReady(true); // Quill 초기화 완료

//       // 텍스트가 변경될 때마다 HTML 업데이트
//       quillInstance.on("text-change", () => {
//         const html = quillInstance.root.innerHTML;
//         setEditorContent(html);
//       });
//     }

//     // 언마운트 시에 editorRef null로 변경
//     return () => {
//       if (editorRef.current) {
//         editorRef.current = null;
//       }
//     };
//   }, [modules, isQuillReady]);

//   return (
//     <div>
//       <div ref={editorRef}></div>
//     </div>
//   );
// };

// export default Editor;
