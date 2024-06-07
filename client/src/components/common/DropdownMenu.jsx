import React, { forwardRef, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine  } from 'react-icons/ri'

const DropdownMenu = forwardRef((props, ref) => {

    const [isDropdown, setDropdown] = useState(false)
    const [dropdownValue, setDropdownValue] = useState(props.name)
    const handleDropdown = (value) => {
      console.log(value)
      setDropdownValue(value)
      setDropdown(false)
    }
  return (

    <label className="relative text-white outline-none" >
                  
    <input
      required
      name={props.value}
      value={dropdownValue ?dropdownValue: props.name}
      placeholder={props.name}
      {...props.register(props.value,{required:props.required})}
  
      className="w-full bg-transparent border-transparent focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem]  p-[12px]"
    />
    <div className='h-[1px] w-full bg-white'></div>
    <span
      onClick={() => setDropdown((prev) => !prev)}
      className="absolute right-3 top-[16px] z-[10] cursor-pointer"
    >

      {isDropdown ? (
        <RiArrowDropUpLine fontSize={24} fill="#FFFFFF" />
      ) : (
        <RiArrowDropDownLine fontSize={24} fill="#FFFFFF" />
      )}
    </span>
    <div className='h-auto w-full bg-transparent rounded-md p-[1rem] border z-2' style={{display: isDropdown? "" : "none"}}>
    <ul>
      {props.data.map((branch, index) => (
        <li key={branch} className='text-center' onClick={() =>handleDropdown(branch)}>{branch}</li>
      ))}
    </ul>
    </div>
  </label>
  )
})

export default DropdownMenu