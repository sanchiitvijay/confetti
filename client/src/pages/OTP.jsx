import React, { useEffect, useState } from 'react'
import Submitbutton from "../components/common/SubmitButton"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaClockRotateLeft } from "react-icons/fa6";
import { Spinner } from 'flowbite-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import OTPInput from 'react-otp-input';

const OTP = () => {
    const {loading,signupData}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [otp,setOtp]=useState("");
    const navigate=useNavigate();
  
  
    // useEffect(()=>{
    //   if(!signupData){
    //     navigate("/signup");
    //   }
    // });
  
    // const handleOnSubmit=(e)=>{
    //   e.preventDefault();
    //   const {
    //     accountType,
    //     name,
    //     username,
    //     usn,
    //     email,
    //     password,
    //     confirmPassword,
    //     gender,
    //     branch,
    //     year,
    //     instagram,
    //     avatar,
    //     otp,
       
    //   } = signupData;
    //   dispatch(signUp( accountType,
    //     name,
    //     username,
    //     usn,
    //     email,
    //     password,
    //     confirmPassword,
    //     gender,
    //     branch,
    //     year,
    //     instagram,
    //     avatar,
    //     otp,
    //     navigate));
    // }
    return (
      <div class="text-white flex items-center justify-center flex-col h-[calc(100vh-56px)]">
        {
          loading?
          (
            <Spinner/>
          )
          :(
            <div className="py-12  flex-col flex gap-4 px-12 w-[90%] md:w-[420px]   bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400">
              <h1 className="text-2xl font-bold">Verify Email</h1>
              <p className="mb-4 text-base leading-1 text-[#ffffff]">A verification code has been sent to you. Enter the code below.</p>
              <form  >
                <OTPInput
                 className=" w-full p-6  text-white"
                value={otp}
                onChange={setOtp}
                numInputs={6}

                renderSeparator={<span className="text-white">-</span>}
                renderInput={(props) => <span className="rounded-xl  text-white mx-auto px-[1px] newsmall:px-[1px] sm:px-[5px] py-[8px] border border-gray-100 "><input   {...props} className="bg-transparent box-content text-white outline-none focus:ring-0 border-none"/></span>}
                />
              <Submitbutton text={"Verify Email"} customClasses='w-full mx-auto  mt-10 '/>
              </form>
  
              <div  className="flex mt-2 justify-between items-center ">
                
                <Link className="flex text-richblack-25 justify-center items-center " to="/">
                  <IoIosArrowRoundBack fontSize={25} />
                  <p className="text-sm group-hover:underline   font-semibold">Back to login</p>
                </Link>
                
  
  
                  <button  className="flex gap-1 hover:underline text-[#ffffff] justify-center items-center " >
                  <FaClockRotateLeft fontSize={15}/>
                  <p  className="text-sm font-semibold">Resend it</p> 
                  </button>
              </div>
            </div>
          )
  
        }
      </div>)
}

export default OTP