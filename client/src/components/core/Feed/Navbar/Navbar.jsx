import React, { useEffect } from 'react'
import logo from "../../../../assets/confettiNoText.png"
import { Link, useNavigate } from 'react-router-dom'
import { MdDarkMode } from "react-icons/md";

import { useSelector } from 'react-redux';
import { logout } from '../../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../../../slices/themeSlice';
import { motion } from 'framer-motion';
import UserDetails from './UserDetails';
import Notification from './Notification';




const Navbar = () => {
  const user = useSelector((state) => state.profile.user);
  console.log("USER",user)
  
  

  const dispatch=useDispatch();


  

  const darkMode  = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };
  return (
    

<motion.div className="sticky top-0 z-50 bg-confettiLightColor3 dark:bg-confettiDarkColor3 dark:text-white text-black border-gray-200"
                // initial={{  y: -50 }}
                // animate={{  y: 0 }}
                // exit={{  y: -50 }}
                // transition={{ duration: 0.5 }}
        >
  <div className="max-w-screen-xl flex  flex-wrap h-[3.5rem] items-center justify-between mx-auto py-1 md:px-5 px-3">
  <Link href="/feed" className="flex ml-4 items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-[90px] mt-[-10px] mb-[-30px]" alt="Confetti Logo" />
  </Link>  
  <div className='justify-between dancing-script-font max-md:hidden text-4xl'>
    Confetti
  </div>
  <div className="flex items-center md:order-2 md:gap-4 gap-1 space-x-3 md:space-x-0 mr-3 rtl:space-x-reverse">
    
      <Notification/> 

      {/* Dark Mode Icon */}
      <MdDarkMode className='hover:cursor-pointer' fontSize={29} onClick={handleToggle}/> 

      {/* user dropdown */}
      <UserDetails {...user}/>
  </div>
  </div>
</motion.div>

  )
}

export default Navbar