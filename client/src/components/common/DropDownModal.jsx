import React, { useEffect } from 'react';
import "../../App.css";
import { FaRegWindowMaximize } from "react-icons/fa";
import Modal from './Modal';
import Button from "../common/SubmitButton"
const DropDownModal = ({ name, setModal, showModal,getValues}) => {
  const handleClick = () => {
    setModal(true);
  };

  useEffect(() => {
    console.log(showModal);
    console.log(getValues());
  }, [showModal,getValues]);

  return (
    <div onClick={handleClick} className='
    relative text-white border-b border-b-1 border-b-white w-full cursor-pointer'>
      <input 
        disabled={true}
        className='w-full text-white bg-transparent border-transparent focus:outline-none focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem] p-[12px]'
        placeholder={`Choose ${name}`}
      />
      <span className='absolute right-3 top-[16px] z-[10]'>
        <FaRegWindowMaximize />
      </span>

      
    </div>
  );
};

export default DropDownModal;
