import React, { useEffect, useState } from 'react';
import "../../App.css";
import { FaRegWindowMaximize } from "react-icons/fa";

const DropDownModal = ({ name, setModal, showModal,getValues}) => {
  const handleClick = () => {
    setModal(true);
  };
  const [inputValues, setInputValues] = useState(getValues(name));

  useEffect(() => {
    setInputValues(getValues(name));
  }, [showModal,getValues]);

  return (
    <div 
      onClick={handleClick} 
      className='relative text-white border-b border-b-1 border-b-white w-full cursor-pointer'>
  <input 
    disabled={true}
    className='w-full text-white bg-transparent border-transparent focus:outline-none focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem] p-[12px]'
    placeholder={`Choose ${name}`}
    value={getValues(name.toLowerCase())}
  />
  
  <div 
    onClick={() => handleClick()} 
    className='absolute inset-0 z-10 cursor-pointer'
    style={{ pointerEvents: 'auto' }}
  />
  
  <span className='absolute right-3 top-[16px] mr-1 z-[10]'>
    <FaRegWindowMaximize />
  </span>
</div>


  );
};

export default DropDownModal;
