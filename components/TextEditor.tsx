import { useInternship } from '@/context/internshipContext';
import clsx from 'clsx';
import React from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  style: {
    minHeight: string;
    maxHeight?: string;
    backgroundColor: string;
    borderColor?: string;
    focusBorderColor?: string;
    
  }
  modules: {
    toolbar: boolean;
  }
  className?: string;
}

const TextEditor = ({ value, onChange, style, modules, className }: TextEditorProps) => {
  const customStyle = {
    ...style,
    '--focus-border-color': style.focusBorderColor || '#2563eb',
  } as React.CSSProperties;

  return (
    <div className={clsx('quill-container', className)}>
      <ReactQuill
        value={value}
        onChange={onChange}
        style={customStyle}
        modules={modules}
        className={clsx("custom-quill-editor")}
      />
      <style jsx global>{`
        .quill-container .custom-quill-editor:focus-within .ql-toolbar.ql-snow,
        .quill-container .custom-quill-editor:focus-within .ql-container.ql-snow {
          border-color: var(--focus-border-color) !important;
        }
      `}</style>
    </div>
  )
}

export default TextEditor;
