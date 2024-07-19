import React, { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../App.css"
const DropdownMenu = forwardRef((props, ref) => {
  const [selectedValue, setSelectedValue] = useState(" ");

  const handleChange = (event) => {
    const newValue = event.target.value;
    console.log(newValue);
    setSelectedValue(newValue);
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  useEffect(() => {
    if (props.value) {
      setSelectedValue(props.value);
    }
  }, [props.value]);

  return (
    <div className="relative text-white border-b-1 border-b-white bg-transparent w-full">
      <select
        ref={ref}
        name={selectedValue}
        value={selectedValue}
        {...props.register(selectedValue, { required: props.required })}
        onChange={handleChange}
        className="w-full px-4 y-2 border-transparent border-b-1 border-b-white focus:shadow-none focus:ring-0 focus:border-none bg-transparent rounded-none appearance-none"
      >
        <option value="" className="bg-transparent hidden">
          {props.placeholder || props.name}
        </option>
        {props.data.map((option, index) => (
          <option key={index} className="bg-transparent" value={option}>
            {option}
          </option>
        ))}
      </select>
      {props.error && (
        <p className="text-red-500 text-sm mt-1">
          {props.name.charAt(0).toUpperCase() + props.name.slice(1)} is required
          *
        </p>
      )}
    </div>
  );
});

export default DropdownMenu;