import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJobData } from "../store/reducers/globalReducer";
import { useDebouncedCallback } from "use-debounce";

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const formatText = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
    console.log({ value: editorRef.current.innerHTML });
    dispatch(setJobData({ description: editorRef.current.innerHTML }));
  };

  const debounced = useDebouncedCallback(handleInput, 500);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 border rounded-lg shadow-sm bg-white">
      {/* Toolbar */}
      <div className="flex items-center space-x-4 px-4 py-2 border-b bg-gray-50">
        <button
          onClick={() => formatText("bold")}
          className="font-bold text-lg hover:text-blue-600"
        >
          B
        </button>
        <button
          onClick={() => formatText("italic")}
          className="italic text-lg hover:text-blue-600"
        >
          I
        </button>
        <button
          onClick={() => formatText("insertUnorderedList")}
          className="text-lg hover:text-blue-600"
        >
          • List
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={debounced}
        className="min-h-[300px] p-4 outline-none text-sm sm:text-base leading-relaxed"
        placeholder="Start typing here..."
      ></div>

      {/* Bottom Bar */}
      <div className="h-1 bg-black w-10 mx-auto my-3 rounded-sm"></div>
    </div>
  );
}
