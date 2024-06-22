import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({text,nav,px=8,py=2,cc1="",cc2="",child=null}) => {
  const navigate=useNavigate();
  return (
    <button onClick={()=>navigate(nav)} className={`p-[3px] relative ${cc1}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-confettiYellow2 to-orange-400 rounded-lg" />
        <div className={` ${cc2} px-${px} py-${py}
         bg-white rounded-[6px]  relative group transition hover:text-white 
          duration-200 text-orange-400 hover:bg-transparent`}>
            {child}{text}
        </div>
    </button>
  )
}

export default Button