import React, { useRef, useEffect, useState, useMemo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./EditorItem.css";
import { useStore } from "../../stores/FileStore/useStore";

const Editor = ({ htmlContent, editorContent, setEditorContent, quillRef }) => {
  const editorRef = useRef(null);
  const [isQuillReady, setIsQuillReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState([]);
  const { state, actions } = useStore();

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
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        // 이미지 저장 요청 보내기
        await actions.createImgData(formData);
        setIsLoaded(true);
      } catch (error) {
        console.error("이미지 업로드 실패", error);
      }
    });
  };

  // 이미지 로드된 후 에디터 삽입
  useEffect(() => {
    if (state) {
      const range = quillRef.current.getSelection();
      if (range) {
        // 이미지 삽입
        quillRef.current.insertEmbed(range.index, "image", state);
      }

      setIsLoaded(false);
      actions.resetState();
    }
  }, [isLoaded]);

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
    if (isQuillReady && quillRef.current && htmlContent) {
      quillRef.current.clipboard.dangerouslyPasteHTML(htmlContent);
    }
  }, [htmlContent]);

  // Quill 초기화
  useEffect(() => {
    if (editorRef.current && !isQuillReady) {
      const quillInstance = new Quill(editorRef.current, {
        theme: "snow",
        modules: modules,
      });
      quillRef.current = quillInstance;
      setIsQuillReady(true);
  
      // editorContent가 초기화 시점에 있을 경우 반영
      if (editorContent) {
        quillInstance.clipboard.dangerouslyPasteHTML(editorContent);
      }
  
      // 에디터 내용 변경 시 상태 업데이트
      quillInstance.on("text-change", () => {
        setEditorContent(quillInstance.root.innerHTML);
      });
    }
  }, [modules, isQuillReady]);
  


  return (
    <div>
      <div ref={editorRef}></div>
    </div>
  );
};

export default Editor;
