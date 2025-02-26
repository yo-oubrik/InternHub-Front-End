import clsx from 'clsx'
import React from 'react'

interface OverlayProps {
    children : React.ReactNode ,
    className? : string,
}

const Overlay = ({children , className} : OverlayProps) => {
  const defaultClassName = "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl opacity-0 group-hover:opacity-100 duration-300 cursor-pointer"
  return (
    <div className={clsx(className || defaultClassName )}>
        {children}
    </div>
  )
}

export default Overlay
