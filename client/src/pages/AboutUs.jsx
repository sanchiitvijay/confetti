import React from 'react'
import Logo from "../assets/confetti.png";
import { VscCoffee } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const BuyUsCoffee = () => {
  return (  
    <div className='flex relative flex-col mx-auto w-full text-black dark:text-white dark:bg-confettiDarkColor2 bg-confettiLightColor2 min-h-[100vh] items-center content-center'>
        <Link to='/' className='absolute top-5 right-5'> <FaGithub fontSize={42}/> </Link>
        <div>
        <div className='text-3xl pb-5 font-semibold my-8 text-center'>About Us</div>
        <div className='flex md:flex-row flex-col gap-9'>
            <div className='items-center text-center'>
                <img src={Logo} alt="person1" className='h-[80px] mx-auto rounded-full border-2'/>
                <div className='text-lg font-semibold'>Ashutosh Kumar</div>
                <div>Description</div>
                <div className='flex flex-row place-content-center text-center text-2xl mt-3 gap-3'>
                  <FaGithub/>
                  <FaLinkedin/>
                </div>
            </div>
            <div className='items-center text-center'>
                <img src={Logo} alt="person1" className='h-[80px] mx-auto rounded-full border-2'/>
                <div className='text-lg font-semibold'>Sanchit Vijay</div>
                <div>Description</div>
                <div className='flex flex-row place-content-center text-center text-2xl mt-3 gap-3'>
                  <FaGithub/>
                  <FaLinkedin/>
                </div>
            </div>
        </div>
        </div>

        <div className='flex mt-10 text-yellow-500  flex-row gap-4 '>
          <div className='text-3xl font-bold'>Buy Us Coffee </div>
          <VscCoffee fontSize={40} className='my-auto'/>
        </div>
    </div>
  )
}

export default BuyUsCoffee