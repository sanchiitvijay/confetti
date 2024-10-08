import React from 'react'

const IconBtn = ({text,customClasses,onclick,children}) => {
  return (
    <button  onClick={onclick}  className={`p-[3px] relative ${customClasses}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-confettiYellow2  to-orange-400 rounded-lg" />
    <div className="px-6 py-2 flex my-auto gap-2 bg-white rounded-[6px] relative group transition hover:text-white duration-200 place-content-center text-orange-400 hover:bg-transparent">
       {children} {text}
    </div>
</button>
  )
}

export default IconBtn