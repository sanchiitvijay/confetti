import React, { Suspense } from 'react'
import { useDispatch, useSelector } from "react-redux";
 import { resetPassword } from "../services/operations/authAPI";
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Spinner from "../components/common/Spinner";
import SubmitButton from '../components/common/SubmitButton';
import Loader from '../components/common/Loader';

const UpdatePassword = () => {
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:"",
      });
      const location=useLocation();
      const {password,confirmPassword}=formData;
      const {loading}=useSelector((state)=>state.auth);
      const [showPassword,setShowPassword]=useState(false);
      const [showConfirmPassword,setShowConfirmPassword]=useState(false);
      const dispatch=useDispatch();
      const navigate=useNavigate();
      

    
      const handleOnChange=(e)=>{
        setFormData((prevData)=>(
          {
          ...prevData, 
          [e.target.name] : e.target.value
          }
        )
        )
      }
      
      const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate));
       
      }
  
    return (
      <Suspense fallback={<Loader/>}>
        <div className="text-white  flex justify-center items-center w-screen h-screen  
        ">
            {
            loading?(
              <Spinner/>
            )
            :(

        <div className='py-12 flex-col flex gap-4 px-12 w-[90%] md:w-[420px]   bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400 '>
            <h1 className="text-2xl font-semibold">Choose new Password</h1>
                
                <p className="text-[16px] leading-1 text-white">Almost done. Enter your new password and you're all set.</p>
                
                <form className="flex flex-col gap-10" onSubmit={handleOnSubmit}>
                  
                  
                  <label className="relative">
                    
                    <input
                  
                    required
                    type={showPassword?"text":"password"}
                    name='password'
                    value={password}
                    className="w-full text-sm newsmall:text-base text-white bg-transparent border-transparent focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem]  p-[12px] "
                    onChange={handleOnChange}
                    placeholder="Enter your new Password"
                    />
                    <div className='h-[1px] w-full bg-white'></div>
                    <span className="absolute top-3  right-3 newsmall:top-4 newsmall:right-3" onClick={()=>{setShowPassword((prev)=>!prev)}}>
                      {
                        showPassword?(<AiFillEyeInvisible fontSize={24} />):(<AiFillEye  fontSize={24}/>)
                      }
                    </span>
                  </label>


                  <label className=" relative">
                  
                    <input
                    required
                  
                    className="w-full text-sm newsmall:text-base text-white bg-transparent border-transparent focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem]  p-[12px] "
                    type={showConfirmPassword?"text":"password"}
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm New Password"
                    />
                    <div className='h-[1px] w-full bg-white'></div>
                    <span className="absolute top-3  right-3 newsmall:top-4 newsmall:right-3" onClick={()=>{setShowConfirmPassword((prev)=>!prev)}}>
                      {
                        showConfirmPassword?(<AiFillEyeInvisible  fontSize={24} />):(<AiFillEye  fontSize={24}/>)
                      }
                    </span>
                  </label>


                  <SubmitButton customClasses="w-full " text={`Reset Password`} type="submit" />


                </form>

                  
                <div className="flex mt-2 group hover:cursor-pointer justify-start items-center ">
                    <Link className="flex text-richblack-25 justify-center items-center " to="/">
                      <IoIosArrowRoundBack fontSize={25} />
                      <p className="text-sm group-hover:underline   font-semibold">Back to login</p>
                    </Link>
                </div>
              </div>

            )}
        </div>
    </Suspense>
  )
}

export default UpdatePassword