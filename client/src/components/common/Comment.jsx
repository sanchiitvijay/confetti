import React from 'react'
import logo from "../../assets/confettiNoText.png"
import { MdOutlineDelete } from "react-icons/md";

const Comment = (props) => {
  return (
    <div className='flex flex-row justify-between py-2'>
          <div className='flex flex-row gap-3'>
          <img src={logo} alt="" className='w-[28px] border border-black rounded-full h-[28px] '/>
          <div className='text-[10px] my-auto'><span className='text-xs font-semibold mr-2'> Username: </span>Comment</div>
          </div>
          <MdOutlineDelete fontSize={'20px'}  className='my-auto mr-1'/>
      </div>
  )
}

export default Comment