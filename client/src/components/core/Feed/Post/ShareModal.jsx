import React, { useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { IoShareSocialOutline } from "react-icons/io5";
import useOnClickOutside from '../../../../hooks/useOnClickOutside';
import useEscape from '../../../../hooks/useEscape';

const ShareModal = (props) => {
  const [tooltipMessage, setTooltipMessage] = useState('Copy to clipboard');
  const [isCopied, setIsCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleCopyClick = () => { 
    navigator.clipboard.writeText("feed/:"+props?.id)
      .then(() => {
        setIsCopied(true);
        setTooltipMessage('Copied!');
        setTimeout(() => {
          setIsCopied(false);
          setTooltipMessage('Copy to clipboard');
        }, 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  const modalHandler = () => {
    setShowShareModal(false);
  };
  const modalRef = useRef();
  useOnClickOutside(modalRef, modalHandler);
  useEscape(modalRef, modalHandler);

  return (
    <>
        <IoShareSocialOutline fontSize={'18px'}  className='relative my-auto' onClick={() => setShowShareModal(!showShareModal)}/>
      {
        showShareModal && (
            <div ref={modalRef} className="absolute mx-auto bottom-10 w-full max-w-[16rem]">
      <div className="relative">
        <label className="sr-only">Label</label>
        <input
          id="copy-button"
          type="text"
          className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
          value={"feed/:"+props?.id}
          disabled
          readOnly
          />
        <button
          onClick={handleCopyClick}
          className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
          data-tooltip-target="tooltip-copy-copy-button"
          >
          <span id="default-icon">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
          </span>
          <span id="success-icon" className={`inline-flex items-center ${isCopied ? '' : 'hidden'}`}>
            <svg className="w-3.5 h-3.5 text-yellow-700 dark:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
          </span>
        </button>
        <Tooltip
          id="tooltip-copy-copy-button"
          role="tooltip"
          className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 ${isCopied ? 'opacity-100' : 'opacity-0'}`}
          >
          {tooltipMessage}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </Tooltip>
      </div>
    </div>
        )}
            </>
  );
};

export default ShareModal;
