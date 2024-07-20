import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useOnClickOutside from "../../hooks/useOnClickOutside";
const Modal = ({ data, name, value, error, register, required,setModal}) => {
  const [chosen,setChosen]=useState(false);
  const modalHandler=()=>{
    setModal(false);

  }

  const modalRef=useRef();
  return (
    <div onClick={useOnClickOutside(modalRef,modalHandler)} className="fixed inset-0 backdrop-blur w-[100vw] h-[100vh] flex items-center justify-center z-50">
      <div ref={modalRef}  className="px-12 py-8 xs:w-[100%] md:w-fit bg-gray-600 rounded-md bg-clip-padding backdrop-filter mx-auto justify-center backdrop-blur-md bg-opacity-20 border text-white border-gray-400">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{`Choose ${name}`}</h2>
        </div>
        <div className=" overflow-y-auto  max-h-[300px]">
          {
          data.map((topic, index) => (
            <div className='flex flex-row items-center gap-2'>
            <input onClick={()=>setChosen(true)} key={index} {...register(`${name.toLowerCase()}`)}  id={topic} value={topic} type="radio" className="py-1 px-2 hover:bg-gray-700 focus:outline-0 focus:ring-none cursor-pointer"/>
            <label htmlFor={topic}>{topic}</label>
            </div>
          ))
          }
        </div>

        <button disabled={!chosen} onClick={()=>setModal(false)} className={`p-[3px] mx-auto w-[150px] mt-4 relative `} >
        <div className="absolute inset-0 bg-gradient-to-r from-confettiYellow2 to-orange-400 rounded-lg" />
        <div className="px-8 py-2 w-full bg-white rounded-[6px]  relative group transition hover:text-white duration-200 text-orange-400 hover:bg-transparent">
        {
            chosen?(
              "Done"
            ):(
              "Pick one "
            )
          }
        </div>
    </button>
      </div>
    </div>
  );
};

export default Modal;
