import React, { memo } from 'react'

const SubmitButton = memo(function SubmitButton({text,type,disabled,customClasses="",onclick=""}){
  return (
    <button  type={type} onClick={onclick} className={`p-[3px] relative ${customClasses}`} disabled={disabled}>
        <div className="absolute inset-0 bg-gradient-to-r from-confettiYellow2 to-orange-400 rounded-lg" />
        <div className="px-8 py-2 w-full bg-white rounded-[6px]  relative group transition hover:text-white duration-200 text-orange-400 hover:bg-transparent">
           {text}
        </div>
    </button>
  )
})

export default SubmitButton