import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({text,nav}) => {
  const navigate=useNavigate();
  return (
    <button onClick={()=>navigate({nav})} className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-confettiYellow2 to-orange-400 rounded-lg" />
        <div className="px-8 py-2  bg-white rounded-[6px]  relative group transition hover:text-white duration-200 text-orange-400 hover:bg-transparent">
            {text}
        </div>
    </button>
  )
}

export default Button