import React, { memo } from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";

const OurInfo = memo(function OurInfo(props){
  return (
    <div className='items-center place-items-center grid w-[80%] md:w-[40%] text-center'>
              <div className='rounded-full  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-fit background-animate gradient-box p-[3px]'>
                <img src={props?.image} alt={props?.name} className='h-[180px] my-auto object-cover w-[180px] mx-auto rounded-full border-2'/>
              </div>
                <div className='text-lg font-semibold m-3'>{props?.name}</div>
                <div>{props?.description}</div>
                
                <div className='flex m-3 flex-row place-content-center text-center text-2xl mt-3 gap-3'>
                  <a target="_blank" rel="noreferrer" href={props?.github} className='cursor-pointer'><FaGithub/></a>
                  <a target="_blank" rel="noreferrer" href={props?.linkedin} className='cursor-pointer'><FaLinkedin/></a>
                  <a target="_blank" rel="noreferrer" href={`mailto:${props.email}`} className='cursor-pointer'><TbMailFilled/></a>
                </div>
      </div>
  )
})

export default OurInfo