import { cx } from 'class-variance-authority';
import React, { ChangeEvent } from 'react'

interface Props {
    id? : string ;
    value? : string ; 
    type : string ;
    placeholder? : string;
    className? : string;
    onChange? : (e : ChangeEvent<HTMLInputElement>) => void ;
    required? : boolean;
    accept? : string;
}

const InputField = ({id , value , type , placeholder , onChange , className , required , accept} : Props) => {
  return (
    <div className="relative w-full">
      <input
          id={id}
          type={type}
          {...(type !== "file" ? { value: value ?? "" } : {})}
          placeholder={ type !== "file" ? placeholder : ""}
          className={cx('focus:ring-1 focus:ring-primary rounded-md bg-background py-2 px-4 focus:outline-none border text-sm font-medium border-gray-200 text-gray-600 focus:text-black',className)}
          onChange={onChange}
          required={required}
          accept={accept}
      />
    </div>
  )
}

export default InputField
