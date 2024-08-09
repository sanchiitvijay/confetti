import React from 'react'
import Logo from "../assets/confetti.png";
import { VscCoffee } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import "../components/core/Feed/Settings/Settings.css"

const BuyUsCoffee = () => {
  return (  
    <div className='flex relative flex-col mx-auto w-full text-black dark:text-white dark:bg-confettiDarkColor2 bg-confettiLightColor2 min-h-[100vh] items-center content-center'>
        
        <div className='absolute top-5 right-5 flex flex-row'>
          <div className='w-[200px] hidden hover:block'>
            If you have a moment, please star this repo ⭐. Thanks!
          </div>
            <Link to='/'> <FaGithub fontSize={42}/> </Link>
        </div>
        <div>
        <div className='text-3xl pb-5 font-semibold my-8 text-center'>About Us</div>
        <div className='flex md:flex-row flex-col gap-9'>
            <div className='items-center text-center'>
              <div className='rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-[3px]'>
                <img src={Logo} alt="person1" className='h-[180px] mx-auto rounded-full border-2'/>
              </div>
                <div className='text-lg font-semibold m-3'>Ashutosh Kumar</div>
                <div>Description</div>
                
                <div className='flex m-3 flex-row place-content-center text-center text-2xl mt-3 gap-3'>
                  <a target="_blank" href="https://github.com/ash956901" className='cursor-pointer'><FaGithub/></a>
                  <a target="_blank" href="https://www.linkedin.com/in/ashutosh-kumar-170242189/" className='cursor-pointer'><FaLinkedin/></a>
                  <a target="_blank" href="mailto:ak956901@gmail.com" className='cursor-pointer'><TbMailFilled/></a>
                </div>
            </div>
            <div className='items-center text-center'>
            <div className='rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-[3px]'>
                <img src={Logo} alt="person1" className='h-[180px] mx-auto rounded-full border-2'/>
              </div>
                <div className='text-lg font-semibold m-3'>Sanchit Vijay</div>
                <div>Description</div>
                <div className='flex m-3 flex-row place-content-center text-center text-2xl mt-3 gap-3'>
                  <a target="_blank" href="https://github.com/sanchiitvijay" className='cursor-pointer'><FaGithub/></a>
                  <a target="_blank" href="https://www.linkedin.com/in/sanchiitvijay/" className='cursor-pointer'><FaLinkedin/></a>
                  <a target="_blank" href="mailto:sanchiitvijay@gmail.com" className='cursor-pointer'><TbMailFilled/></a>
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