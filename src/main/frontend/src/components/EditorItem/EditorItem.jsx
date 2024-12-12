import React, { useRef, useEffect, useState, useMemo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./EditorItem.css";
import { useStore } from "../../stores/FileStore/useStore";

const Editor = ({ setEditorContent, quillRef }) => {
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
