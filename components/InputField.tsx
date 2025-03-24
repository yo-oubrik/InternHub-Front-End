import React, { ChangeEvent } from 'react'

interface Props {
    value? : string ; 
    type : string ;
    placeholder? : string;
    className? : string;
    onChange? : (e : ChangeEvent<HTMLInputElement>) => void ;
}

const InputField = ({value="" , type , placeholder , onChange , className} : Props) => {
  return (
    <input
        value={value}
        type={type}
        placeholder={placeholder}
        className={`focus:ring-1 focus:ring-primary rounded-md bg-background py-2 px-4 focus:outline-none border border-gray-200 font-medium text-sm ${className}`}
        onChange={onChange}
    />
  )
}

export default InputField
