import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstaId } from '../../../../services/operations/notificationAPI';
import { set } from 'react-hook-form';

const AcceptReject = ({ postId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [instaid, setInstaid] = useState("");
  const [clicked, setClicked] = useState(false);

  async function getinsta() {
    try {
      if(clicked) {
        setClicked(false);
      }
      else {

        const response = await dispatch(getInstaId(token, postId));
        setInstaid(response);
        setClicked(true);
      }
      
    } catch (error) {
      console.error("Error fetching Instagram ID:", error);
    }
  }

  return (
    <div>
      <div className='mx-auto flex flex-row-reverse gap-10'>
        <button 
          onClick={() => (getinsta())} 
          className='bg-green-500 px-3 py-1 rounded-md text-xs'
        >
          {!clicked ? "Show Insta handle" : "Send them a message 😉"}
        </button>
      </div>

      {clicked && (
        <p className='text-center text-[#bbbb15] dark:text-[#FFFF00] text-sm py-1'>
          Instagram: {instaid ? instaid : 'Made private by user'}
        </p>
      )}
    </div>
  );
};

export default AcceptReject;
