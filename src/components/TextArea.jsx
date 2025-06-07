import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setJobData } from '../store/reducers/globalReducer';
import { useDebouncedCallback } from 'use-debounce';

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const formatText = command => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
    console.log({ value: editorRef.current.innerHTML });
    dispatch(
      setJobData({ key: 'description', value: editorRef.current.innerHTML })
    );
  };

  const debounced = useDebouncedCallback(handleInput, 500);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  return (
    <div className="w-full max-w-full sm:max-w-2xl mx-auto mt-6 sm:mt-10 border rounded-lg shadow-sm bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-3 py-2 border-b bg-gray-50">
        <button
          onClick={() => formatText('bold')}
          className="font-bold text-base sm:text-lg hover:text-blue-600"
        >
          B
        </button>
        <button
          onClick={() => formatText('italic')}
          className="italic text-base sm:text-lg hover:text-blue-600"
        >
          I
        </button>
        <button
          onClick={() => formatText('insertUnorderedList')}
          className="text-base sm:text-lg hover:text-blue-600"
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
        className="min-h-[250px] sm:min-h-[300px] p-3 sm:p-4 outline-none text-sm sm:text-base leading-relaxed"
        placeholder="Start typing here..."
      ></div>

      {/* Bottom Bar */}
      <div className="h-1 bg-black w-8 sm:w-10 mx-auto my-2 sm:my-3 rounded-sm"></div>
    </div>
  );
}
