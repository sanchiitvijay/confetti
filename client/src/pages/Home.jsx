import React, { Suspense, useEffect, useState } from 'react'
import logo from "../assets/confettiNoText.png" 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {AiOutlineEye} from "react-icons/ai"
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import SubmitButton from '../components/common/SubmitButton';
import { login } from '../services/operations/authAPI';
import { motion } from "framer-motion"
import Loader from '../components/common/Loader';
import { setRedirection } from '../slices/authSlice';

/* Wherever Possible make components */

const Home = () => { 
  const {token}=useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
 
  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  console.log(process.env)
  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  const redirection = useSelector((state) => state.auth.redirection)
        
  
  useEffect(()=>{ 
    if(token && redirection){
      dispatch(setRedirection(null))
      navigate(redirection)
    }

    if(token){
      navigate("/feed")
    }
  },[token,navigate])


  return (
    <Suspense fallback={<Loader/>}>
      <div exit={{ opacity: 0 }}>
      <div className='w-full h-full mx-auto text-cFont'>
          

          {/* Login */}
          <div  className='flex flex-col lg:flex-row  min-h-screen p-8  gap-4 items-center lg:justify-around w-full '>
              

              {/* Login form here */}
              <div className='py-12 px-12 lg:w-[90%] xl:w-[420px] h-[478px]  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400 '>
              
              <h2 className='text-white text-4xl font-semibold text-center '>Login</h2>
              <form
                onSubmit={handleOnSubmit}
                className="mt-8 flex w-full flex-col gap-y-8"
              >
                  <label className="w-full dark:text-red-700 text-white">
                  
                    <input
                      required
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="Enter email address"
                      
                      className="w-full text-white bg-transparent border-transparent focus:border-transparent focus:ring-0 placeholder-white rounded-[0.5rem]  p-[12px] "
                    />
                    <div className='h-[1px] w-full bg-white'></div>
                  </label>
                  <label className="relative text-white outline-none" >
                  
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                  
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
                    <div onClick={()=>{
                      navigate("/forgot-password")}}>
                      <p className="mt-5 hover:underline  hover:cursor-pointer transition-all duration-150 ml-auto max-w-max text-sm text-white">
                        Forgot Password ?
                      </p>
                    </div>
                  </label>
                  <SubmitButton
                    text="Sign In"
                    type="submit"
                  />

                  <p className='text-white text-center'>
                    Dont Have An Account ? <span onClick={()=>navigate("/signup")} className='hover:cursor-pointer hover:underline transition-all duration-150 '>Register Here</span>
                  </p>
                    
              </form>

              </div>

              {/* Login form here */}
              <div className='xl:py-12 py-7 min-h-[478px] text-white my-auto px-7 xl:px-12 md:w-[80%] xl:w-[600px] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400 '>

              <img src={logo} className=' mx-auto w-[120px] 'alt="Confetti logo" />
              <div className="dancing-script-font grid place-items-center dancing mt-[-25px] mb-6 mx-auto text-3xl font-semibold">Confetti</div>

              <h2 className='text-white text-center font-semibold text-2xl'>Welcome to Confetti</h2>
              <div className='mt-5 leading-6 text-sm lg:text-[1rem] text-justify'>
              Dive into the anonymous world of college life where secrets are shared, stories are told, and connections are made. Post your deepest confessions, comment on others, and engage in the most candid conversations on campus. Whether it’s a hilarious mishap, a heartfelt moment, or a daring secret, College Confessions is your go-to platform for sharing and discovering the untold tales of college life.
              <br/>
              Join the community. Share your story. Be a part of the conversation.
              </div>

              </div>
          </div>
      </div>
      </div> 
    </Suspense>
  )
}

export default Home



