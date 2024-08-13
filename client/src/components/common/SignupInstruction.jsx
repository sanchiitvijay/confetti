import React, { useState } from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useRef } from 'react';
import useEscape from '../../hooks/useEscape';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const SignupInstruction = () => {
    const instruction = [
      "Choose an anonymous username that doesn't resemble your real name.",
      "Ensure your name is no longer than 20 characters.",
      "Create a strong, secure password.",
      "Provide a valid email address.",
      "Keep your Instagram user ID within 15 characters.",
      "Complete all fields: Name, Username, Email, and Password.",
      "Accept our Terms and Conditions to create a new account."
    ]
    const [showInstructionModal, setShowInstructionModal] = useState(false);
    const modalHandler = () => {
        setShowInstructionModal(false);
      };
      const modalRef = useRef();
      useOnClickOutside(modalRef, modalHandler);
      useEscape(modalRef, modalHandler);
  return (
    <>
        <div  className='ml-2 mb-2 flex justify-end'>
            <IoIosInformationCircleOutline className="text-2xl text-white" onClick={() => setShowInstructionModal(!showInstructionModal)}/>
        </div>

        {
        showInstructionModal && (
            <div className='text-yellow-200 p-3 rounded-md backdrop-blur-md bg-[rgb(103,103,103)] opacity-90'
            ref={modalRef}
            >
                <h2 className=" text-sm font-semibold">Signup Instructions 🤫</h2>
                <ul className="list-disc list-inside">
                    {instruction.map((ins, index) => (
                        <li key={index} className="mt-2 text-sm ">{ins}</li>
                    ))}
                </ul>
            </div>
        )}
    </>
  )
}

export default SignupInstruction