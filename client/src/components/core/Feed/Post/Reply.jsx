import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteReply } from '../../../../services/operations/replyAPI';

const Reply = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.profile.user);
    
    const deleteReplyHandle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteReply(token, {replyId: props?._id}));
    }


  return (
      <div className='flex flex-row ml-1 max-w-[500px] justify-between pt-2'>
          <div className='flex flex-row gap-3'>
          <img src={props?.author?.displayPicture} alt="" className='w-[28px] border border-black rounded-full h-[28px] '/>
          <div className='text-[12px] font-light my-auto'><span className='text-sm font-semibold mr-2'> {props?.author?.username} </span>{ props?.description }</div>
          </div>

          {
            user ?(
              user?._id === props?.author?._id &&
              <MdOutlineDelete fontSize={'25px'}  className='my-auto mr-1' onClick={deleteReplyHandle}/>):(<></>)
            }
        </div>
  
  )
}

export default Reply