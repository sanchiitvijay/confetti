import React, { useState } from 'react'
import {AiOutlineEye} from "react-icons/ai"
import { AiOutlineEyeInvisible } from 'react-icons/ai';


const PasswordInput = (props) => {
        const [showPassword, setShowPassword] = useState(false)
        return (
            <label className="relative text-white outline-none" >
                 
        <input
          required
          type={showPassword ? "text" : "password"}
          name={props.name.trim()}
         //  value={password}
         //  onChange={handleOnChange}
          placeholder={(props.name === "password" ? "Enter " : "") + props.name}
          {...props?.register(props?.value,{required:props?.required})}
          className="w-full bg-transparent border-transparent focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem]  p-[12px]"
        />
        <div className='h-[1px] w-full bg-white'></div>
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[16px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#FFFFFF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#FFFFFF" />
          )}
        </span>
          {props?.error && <p className="ml-2 text-yellow-100 mt-1">{props?.value.charAt(0).toUpperCase() + props?.value.slice(1)} is required
          <sup className="text-yellow-400">{" "}*</sup></p>}
    </label>

  )
}

export default PasswordInput