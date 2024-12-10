import React, { useRef, useEffect, useState, useMemo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./EditorItem.css";

const Editor = ({ editorContent, setEditorContent, quillRef }) => {
  const editorRef = useRef(null);
  const [isQuillReady, setIsQuillReady] = useState(false);  

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
  

  // 이미지 핸들러
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "multiple"); // 여러 이미지 선택 가능하도록 설정
    input.click();

    input.addEventListener("change", () => {
      const files = input.files;
      if (!files || files.length === 0) {
        console.error("파일이 선택되지 않았습니다.");
        return;
      }
      // 각 파일을 순차적으로 처리
      Array.from(files).forEach((file) => {
        // FileReader를 사용하여 이미지를 base64로 변환
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result; // base64 인코딩된 이미지 데이터

          // localStorage에 저장 (여러 이미지 저장)
          const storedImages =
            JSON.parse(localStorage.getItem("editorItem64")) || [];
          storedImages.push(base64Image);
          localStorage.setItem("editorItem64", JSON.stringify(storedImages));

          // Quill 에디터에 base64 이미지를 삽입
          const range = quillRef.current.getSelection();

          if (range === null) {
            const length = quillRef.current.getLength();
            quillRef.current.insertEmbed(length, "image", base64Image);
          } else {
            const index = range.index;
            quillRef.current.insertEmbed(index, "image", base64Image);
          }

          // 이미지를 삽입한 후에 커서 위치를 이미지 뒤로 이동
          const newRange = quillRef.current.getSelection();
          if (newRange) {
            quillRef.current.setSelection(newRange.index + 1); // 커서를 이미지 뒤로 이동
          }
        };
        reader.readAsDataURL(file); // 파일을 base64로 읽음
      });
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler, // 이미지 버튼 클릭 시에 핸들러 연결
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
  }, [modules, isQuillReady]);

  return <div ref={editorRef}></div>;
};

export default Editor;
