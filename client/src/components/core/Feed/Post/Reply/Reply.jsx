import React from 'react'
import { MdOutlineDelete } from "react-icons/md";

const Reply = (props) => {
    const deleteReplyHandle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("delete reply")
    }
  return (
      <div className='flex flex-row ml-3 max-w-[500px] justify-between pt-2'>
          <div className='flex flex-row gap-3'>
          <img src="" alt="" className='w-[28px] border border-black rounded-full h-[28px] '/>
          <div className='text-[12px] font-light my-auto'><span className='text-sm font-semibold mr-2'> username </span>{ props.description }</div>
          </div>

          <MdOutlineDelete fontSize={'22px'}  className='my-auto mr-1' onClick={deleteReplyHandle}/>
          {/* {
            user ?(
              user?._id === props?.author?._id &&
              <MdOutlineDelete fontSize={'25px'}  className='my-auto mr-1' onClick={deleteCommentHandler}/>):(<></>)
            } */}
        </div>
  
  )
}

export default Reply