import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Modal = ({ data, name, value, error, register, required, setModal }) => {
  const [chosen, setChosen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef();

  const modalHandler = () => {
    setIsVisible(false);
    setTimeout(() => setModal(false), 300); // Delay to allow exit animation to complete
  };

  useOnClickOutside(modalRef, modalHandler);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 backdrop-blur w-[100vw] h-[100vh] flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <motion.div
            ref={modalRef}
            className="px-12 py-8 xs:w-[100%] md:w-fit bg-gray-600 rounded-md bg-clip-padding backdrop-filter mx-auto justify-center backdrop-blur-md bg-opacity-20 border text-white border-gray-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, transition: { duration: 0.3, delay: 0.1 } }}
            exit={{ scale: 0.8, transition: { duration: 0.3 } }}
          >
             <div className="mb-4">
          <h2 className="text-xl font-semibold">{`Choose ${name}`}</h2>
        </div>
        <div className="overflow-y-auto max-h-[300px]">
          {data.map((topic, index) => (
            <div key={index} className='flex flex-row items-center gap-2'>
              <input
                onClick={() => setChosen(true)}
                {...register(`${name.toLowerCase()}`)}
                id={topic}
                value={topic}
                type="radio"
                className="py-1 px-2 hover:bg-gray-700 focus:outline-0 focus:ring-none cursor-pointer"
              />
              <label htmlFor={topic}>{topic}</label>
            </div>
          ))}
        </div>
            <button
              disabled={!chosen}
              onClick={modalHandler}
              className={`p-[3px] mx-auto w-[150px] mt-4 relative ${chosen ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-confettiYellow2 to-orange-400 rounded-lg" />
              <div className="px-8 py-2 w-full bg-white rounded-[6px] relative group transition hover:text-white duration-200 text-orange-400 hover:bg-transparent">
                {chosen ? "Done" : "Pick one"}
              </div>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;