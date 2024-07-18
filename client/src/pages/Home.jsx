import React, { useEffect, useState } from 'react'
import logo from "../assets/confetti.png" 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineEye} from "react-icons/ai"
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import SubmitButton from '../components/common/SubmitButton';
import { login } from '../services/operations/authAPI';
import { motion } from "framer-motion"

/* Wherever Possible make components */

const Home = () => { 
  const {token}=useSelector((state)=>state.auth)
  const {setLoading}=useSelector((state)=>state.auth);
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

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }
  
  useEffect(()=>{
    
    if(token){
      navigate("/feed")
    }
  },[token,navigate])


  return (

    <motion.div exit={{ opacity: 0 }}>
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
            <div className='py-12   lg:h-[478px] text-white px-8 lg:px-12 md:w-[80%] xl:w-[600px] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400 '>
              {/* <div className='z-0 mt-4'>
                  <Marquee autoFill="true" delay="2" className='[word-spacing:95px]'>

                    <div className="mr-[95px] text-lg text-gray-800" >
                      CONFESS PROPOSE LIKE FIGHT<br/>
                    </div>
                </Marquee>
              </div> */}
            <img src={logo} className=' mx-auto w-[120px] h-[120px]' alt=""/>
            {/* <h2 className='text-white text-center font-semibold text-2xl'>About Us</h2> */}
            <p className='mt-5 leading-6 text-sm lg:text-[1rem] text-justify'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
              the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
              type and scrambled it to make a type specimen book. It has survived not only five centuries, but 
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in 
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
              with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            </div>
        </div>
    </div>
    </motion.div> 
  )
}

export default Home



