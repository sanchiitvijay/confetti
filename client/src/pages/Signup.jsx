import React, { useState } from 'react'
import SignUpButton from '../components/common/SignUpButton';
import PasswordInput from '../components/common/PasswordInput';
import DropdownMenu from '../components/common/DropdownMenu';
import { RxAvatar } from "react-icons/rx";
import SubmitButton from '../components/common/SubmitButton';


const Signup = () => {

 const gender = ["Male", "Female", "Other"]
  const year = ["First", "Second", "Third", "Fourth"]
  const branches = ["CSE", "ISE", "EEE"]
  const [avatar, setAvatar] = useState({
    file: null,
    url:""
})

const handleAvatar = async (e) => {
  if(e.target.files[0]){
      setAvatar(e.target.files[0])
  }
}
  
  return (
    <div className='w-full h-screen mx-auto text-cFont'>

      <div className='min-h-screen p-8 bg-cover bg-ring bg-center item-center justify-between w-full'>

        <div className='py-12 px-12 xs:w-[100%] md:w-fit bg-gray-400 rounded-md bg-clip-padding backdrop-filter mx-auto justify-center backdrop-blur-md bg-opacity-20 border border-gray-400'>

          <h2 className='text-white text-4xl font-semibold text-center'>
            Sign Up
          </h2>

          <form className='mt-8 flex w-full flex-col gap-y-8'>
          {/* having 2 input fieldl in one row */}
          <div className='flex flex-col md:flex-row gap-10'>
          <div className='flex flex-col gap-y-8'>
             <SignUpButton name="name"/>
            <SignUpButton name="email"/>
          </div>
            <div className='flex flex-row mx-auto'>
              
            <label htmlFor="file" >
            {avatar.url ? (
              <img src={avatar.url} alt="Avatar" />
            ) : (
              <RxAvatar  fontSize={100} color='ffffff'/>
            )}
            Upload avatar
                </label>
            </div>
                <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
            
          </div>
          <div className='flex flex-col md:flex-row gap-10'>

            <SignUpButton name="username"/>

            <SignUpButton name="USN"/>
          </div>
          
          <div className='flex flex-col md:flex-row gap-10'>

         <PasswordInput name="password"/>
         <PasswordInput name="confirm password"/>
            
          </div>

          <div className='flex flex-col md:flex-row gap-10'>
            <DropdownMenu data={gender} name="Gender"/>
            <DropdownMenu data={branches} name="Branch"/>
          </div>

          <div className='flex flex-col md:flex-row gap-10'>
            <DropdownMenu data={year} name="Year"/>
            <SignUpButton name="Instagram"/>
          </div>

          <SubmitButton
                  text="Sign Up"
                  type="submit"
            />

          </form>

        </div>
      </div>
    </div>
  )
}

export default Signup