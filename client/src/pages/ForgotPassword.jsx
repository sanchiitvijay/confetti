import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { IoIosArrowRoundBack } from "react-icons/io";
import Spinner from "../components/common/Spinner";
import SubmitButton from "../components/common/SubmitButton";

const ForgotPassword = () => {
  const [email,setEmail]=useState("");
  const [emailSent,setEmailSent]=useState(false);
  const {loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }
  return (
    <div className="text-white  flex justify-center items-center w-screen h-screen  
    ">
      {
        loading?
        <Spinner/>
        :(
          <div className=" py-12 flex-col flex gap-4 px-12 w-[90%] md:w-[420px]   bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400 ">
            <h1 className="text-3xl font-semibold">
              {
                !emailSent?
                ("Reset your password")
                :(
                  "Check Your Email"
                )
              }
            </h1>

            <p className="text-[16px] leading-1 text-white">
              {
                !emailSent?
                (
                  "Have no fear. We'll email you instructions to reset your password. If your dont have access to your email , we can try account recovery."
                )
                :(
                  `We have sent the reset email to ${email}`
                )
              }
            </p>

            <form onSubmit={handleOnSubmit} className="flex flex-col gap-10">
              {
                !emailSent && (
                  <label> 
            
                    <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter Your Email Address"
                    className="w-full text-white bg-transparent border-transparent focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem]  p-[12px] "
                    />
                    <div className='h-[1px] w-full bg-white'></div>
                  </label>
                )
              }

              <SubmitButton customClasses="w-full " text={` ${
                  !emailSent?
                  ("Reset Password")
                  :("Resend Email")
                }`} type="submit" />
            </form>
              
            <div className="flex mt-2 group hover:cursor-pointer justify-start items-center ">
                <Link className="flex text-richblack-25 justify-center items-center " to="/">
                  <IoIosArrowRoundBack fontSize={25} />
                  <p className="text-sm group-hover:underline   font-semibold">Back to login</p>
                </Link>
            </div>

          </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
