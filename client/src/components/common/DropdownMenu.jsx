import React, { forwardRef, useEffect, useState } from 'react';

const DropdownMenu = forwardRef((props, ref) => {

    const [isDropdown, setDropdown] = useState(false)
    const [dropdownValue, setDropdownValue] = useState(props.name)
    const handleDropdown = (value) => {
      console.log(value)
      setDropdownValue(value)
      setDropdown(false)
    }
  return (
    <div className="relative text-white border-b-1 border-b-white bg-transparent w-full">
      <select
        ref={ref}
        name={selectedValue}
        value={selectedValue}
        // {...props.register(selectedValue, {required: props.required })}
        onChange={handleChange}
        className="w-full px-4 y-2 border-transparent border-b-1 border-b-white focus:shadow-none focus:ring-0 focus:border-none bg-transparent rounded-none appearance-none"
      >

        <option value="" className='bg-transparent hidden'>
          {props.placeholder || props.name}
        </option>
        {props.data.map((option, index) => (
          <option key={index} className='bg-transparent' value={option}>
            {option}
          </option>
        ))}
      </select>
      {props.error && (
        <p className="text-red-500 text-sm mt-1">
          {props.name.charAt(0).toUpperCase() + props.name.slice(1)} is required *
        </p>
      )}
    </div>
  </label>
  )
})

export default DropdownMenu;