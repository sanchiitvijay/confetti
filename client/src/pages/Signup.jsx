import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import SignUpButton from '../components/common/SignUpButton';
import PasswordInput from '../components/common/PasswordInput';
import DropdownMenu from '../components/common/DropdownMenu';
import { RxAvatar } from "react-icons/rx";
import SubmitButton from '../components/common/SubmitButton';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Signup = () => {
  
  const navigate=useNavigate();
  const [loading, ,setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful}
  } = useForm()

  const handleSignup = async(data) => {
    try{
      setLoading(true);
    //   try {
    //     const response = await axios.post('http://localhost:4000/signup', data);
    //     console.log('User created signed in:', response.data);
    // } catch (error) {
    //     console.error('There was an error sighning the user:', error.response.data);
    // }
      const response={status:"OK"};
      console.log(response);
      setLoading(false);
    }
    catch(error){
      console.log("Error:",error.message);
      setLoading(false);
    }
}

useEffect(()=>{
  if(isSubmitSuccessful){
    reset({
      email:"",
      name:"",
      usn:"",
      password:"",
      confirmPassword:"",
      branch:"",
      year:"",
      avatar:setAvatar({
        file: null,
        url: ""
      }),
      gender:""
    })
  }
},[isSubmitSuccessful, reset]);

 const gender = ["Male", "Female", "Other"]
  const year = ["First", "Second", "Third", "Fourth"]
  const branches = ['CS','IS','AD','AI','AT','BT','CH','CI','CY','EC','EE','EI','IM','BA','MC','MD','ME','CV']
  const [avatar, setAvatar] = useState({
    file: null,
    url:""
})

const handleAvatar = async (e) => {

  if(e.target.files[0]){
    const fileUrl=URL.createObjectURL(e.target.files[0]);
    console.log(fileUrl.split("blob:")[1]);
    setAvatar(
      {
        file:e.target.files[0],
        url:fileUrl
      })
  }
}
  
  return (
    <div className='w-full h-screen mx-auto text-cFont'>

      <div className='min-h-screen p-8 bg-cover bg-ring bg-center item-center justify-between w-full'>

        <div className='py-12 px-12 xs:w-[100%] md:w-fit bg-gray-400 rounded-md bg-clip-padding backdrop-filter mx-auto justify-center backdrop-blur-md bg-opacity-20 border border-gray-400'>

          <h2 className='text-white text-4xl font-semibold text-center'>
            Sign Up
          </h2>

          <form className='mt-8 flex w-full flex-col gap-y-8' onSubmit={handleSubmit(handleSignup)}>
          {/* having 2 input fieldl in one row */}
          <div className='flex flex-col-reverse md:flex-row gap-10'>
          <div className='flex flex-col gap-y-8'>
             <SignUpButton 
             name="name" 
             value="name"
             type="text"
             error={errors.name}
             required={true}
             register={register}/>
            <SignUpButton 
            name="email" 
            value="email"
            type="email"
            error={errors.email}
            required={true}
            register={register}/>
          </div>
            <div className='flex flex-row mx-auto'>
              
            <label className="text-white hover:underline hover:cursor-pointer" htmlFor="file" >
            {avatar.url ? (
              <img src={avatar.url} className="rounded-full w-[100px] h-[100px]" alt="Avatar" />
            ) : (
              <RxAvatar  fontSize={100} color='ffffff'/>
            )}<span className='text-center mx-auto'>
            Upload avatar
            </span>
                </label>
            </div>
                <input type="file" id="file" style={{display: "none"}} register={register} onChange={handleAvatar}/>
            
          </div>
          <div className='flex flex-col md:flex-row gap-10'>

            <SignUpButton 
            name="username" 
            value="username" 
            required={true}
            type="text"
            error={errors.username}
            register={register}/>

            <SignUpButton 
            name="USN" 
            value="usn" 
            type="text"
            required={true}
            error={errors.usn}
            register={register}/>
          </div>
          
          <div className='flex flex-col md:flex-row gap-10'>

         <PasswordInput
          name="password" 
          value="password" 
          type="password"
          required={true}
          error={errors.password}
          register={register}/>

         <PasswordInput 
         name="Confirm password" 
         value="confirmPassword" 
         type="password"
         error={errors.confirmPassword}
          required={true}
         register={register}/>
            
          </div>

          <div className='flex flex-col md:flex-row gap-10'>
            <DropdownMenu 
            data={gender} 
            name="Gender" 
            value="gender"
            error={errors.gender} 
            register={register}
            required={false}
            />
            <DropdownMenu 
            data={branches} 
            name="Branch" 
            value="branch" 
            customClasses="overflow-y-auto h-[95px]"
            error={errors.branch}
            required={false}
            register={register}/>
          </div>

          <div className='flex flex-col md:flex-row gap-10'>
            <DropdownMenu 
            data={year} 
            name="Year" 
            value="year"
            error={errors.year}
            register={register}
            required={true}
            />
            <SignUpButton 
            name="Instagram" 
            value="instagram" 
            type="text" 
            error={errors.instagram}
            register={register}
            required={false}/>
          </div>

          <SubmitButton
                  disabled={loading}
                  text="Sign Up"
                  type="submit"
            />

            <div className='text-white text-center'>
              Already Have An Account, <span onClick={()=>navigate("/")} className='hover:underline hover:cursor-pointer'>Log In Here</span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Signup