import { Plus } from 'lucide-react';
import React from 'react'

interface PlusButtonProps {
  onClick? : () => void;
  className? : string;
}


const PlusButton = ({onClick, className} : PlusButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`border-[2px] border-dashed border-gray-300 w-full py-4 hover:bg-opacity-70 text-black bg-gray-200 bg-opacity-50 p-2 rounded-lg flex justify-center items-center ${className}`}
    >
      <Plus className="w-5" />
    </button>
  );
}

export default PlusButton
