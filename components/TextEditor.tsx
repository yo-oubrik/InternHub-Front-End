import { useInternship } from '@/context/internshipContext';
import clsx from 'clsx';
import React from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // Add this import for Quill styles

interface TextEditorProps {
    value : string ; 
    onChange : (value : string) => void ;
    style : { 
        minHeight: string ;
        maxHeight: string ;
    }
    modules : {
        toolbar : boolean ;
    }
    className? : string ;
}

const TextEditor = ({value , onChange , style , modules , className} : TextEditorProps) => {

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      style={style}
      modules={modules}
      className={clsx("custom-quill-editor",className)}
    />
  )
}

export default TextEditor;
