import React, { ChangeEvent } from 'react'

interface Props {
    value? : string ; 
    type : string ;
    placeholder? : string;
    className? : string;
    onChange? : (e : ChangeEvent<HTMLInputElement>) => void ;
    required? : boolean;
    accept? : string;
}

const InputField = ({value="" , type , placeholder , onChange , className , required , accept} : Props) => {
  return (
    <div className="relative">
      <input
          type={type}
          value={value}
          placeholder={placeholder}
          className={`focus:ring-1 focus:ring-primary rounded-md bg-background py-2 px-4 focus:outline-none border border-gray-200 font-medium text-sm text-gray-500 focus:text-black ${className}`}
          onChange={onChange}
          required={required}
          accept={accept}
      />
      {type === "file" && value && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
          {value}
        </span>
      )}
    </div>
  )
}

export default InputField
