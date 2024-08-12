import React, { useState } from 'react'
import { VscCoffee } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa6";
import "../components/core/Feed/Settings/Settings.css"
import FeedbackForm from '../components/core/AboutUs/FeedbackForm';
import OurInfo from '../components/core/AboutUs/OurInfo';

const BuyUsCoffee = () => {
  const developerData = [
    {
        name: 'Ashutosh Kumar',
        description: 'Description',
        image: '',
        github: 'https://github.com/ash956901',
        linkedin: 'https://www.linkedin.com/in/ashutosh-kumar-170242189/',
        email: 'ak956901@gmail.com',
    },
    {
        name: 'Sanchit Vijay',
        description: 'Description',
        image: '',
        github: 'https://github.com/sanchiitvijay',
        linkedin: 'https://www.linkedin.com/in/sanchiitvijay/',
        email: 'sanchiitvijay@gmail.com',
    }
]
  const [isHovered, setIsHovered] = useState(false);
  return (  
    <div className='flex relative flex-col mx-auto w-full text-black dark:text-white dark:bg-confettiDarkColor2 bg-confettiLightColor2 min-h-[100vh] items-center content-center'>
        
        <div className='absolute top-5 z-10 bg-white dark:bg-confettiDarkColor2 border dark:border-white border-black rounded-3xl gap-4 right-5 flex flex-row'>
          <div className={`w-[200px] text-sm transition-all duration-500 delay-500 ease-linear text-right 
                    ${isHovered ? 'opacity-100' : 'hidden'}`}>
            If you have a moment, please star this repo ⭐. Thanks!
          </div>
            <a 
            href='https://github.com/sanchiitvijay/confetti'
            target='_blank'
            rel="noreferrer"
            className='cursor-pointer'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

            > 
              <FaGithub fontSize={42}/> 
            </a>
        </div>
        <div className='text-3xl pb-5 font-semibold my-8 text-center'>About Us</div>
        <div className='flex md:flex-row flex-col gap-9'>
            {
              developerData?.map((d, i) => (
                <OurInfo key={i} {...d}/>
              ))
          }
          
        </div>

        <FeedbackForm/>

            {/* buy us a coffee */}
        <div className='flex my-10 text-yellow-500  flex-row gap-4 '>
          <div className='text-3xl font-bold'>Buy Us Coffee </div>
          <VscCoffee fontSize={40} className='my-auto'/>
        </div>
    </div>
  )
}

export default BuyUsCoffee