import React, { Suspense, useState } from 'react';
import { VscCoffee } from "react-icons/vsc";
import { FaGithub, FaDiscord } from "react-icons/fa";
import "../components/core/Feed/Settings/Settings.css";
import FeedbackForm from '../components/core/AboutUs/FeedbackForm';
import OurInfo from '../components/core/AboutUs/OurInfo';
import Loader from '../components/common/Loader';
import { Link } from 'react-router-dom';
import { developerData } from '../components/core/AboutUs/developerData';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Suspense fallback={<Loader />}>
      <div className='flex relative mb-10 flex-col mx-auto w-full text-black dark:text-white dark:bg-confettiDarkColor2 bg-confettiLightColor2 min-h-[100vh] items-center content-center'>
        
        <div className='absolute top-5 z-10 rounded-3xl gap-4 right-5 flex flex-row items-center'>
          <motion.div
            className='w-[200px] bg-white dark:bg-confettiDarkColor2 rounded-3xl h-auto text-sm text-right'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.25, delay: 0.25, ease: "linear" }}
          >
            If you have a moment, please star this repo ⭐. Thanks!
          </motion.div>
          <a
            href='https://github.com/sanchiitvijay/confetti'
            target='_blank'
            rel="noreferrer"
            className='cursor-pointer'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FaGithub fontSize={42} className='text-black dark:text-white' />
          </a>
        </div>
        
        <div className='text-3xl pb-5 font-semibold my-8 text-center'>About Us</div>
        <div className='flex md:flex-row flex-col justify-evenly gap-2 items-center'>
          {developerData?.map((d, i) => (
            <OurInfo key={i} {...d} />
          ))}
        </div>
        
        <FeedbackForm />
        
        {/* Buy us a coffee */}
        <Link to="/feed/buy-us-coffee">
          <div className='flex pb-10 my-10 text-yellow-500 flex-row gap-4'>
            <div className='text-4xl font-bold'>Buy Us Coffee </div>
            <VscCoffee fontSize={40} className='my-auto' />
          </div>
        </Link>
      </div>
    </Suspense>
  );
}

export default AboutUs;
