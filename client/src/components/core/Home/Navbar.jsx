import React, { useEffect } from 'react'
import logo from "../../../assets/confettiNoText.png"
import { Link, useNavigate } from 'react-router-dom'
import { MdDarkMode } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { Dropdown } from 'flowbite-react';
import { RxAvatar } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../../slices/themeSlice';
import { motion } from 'framer-motion';
import { VscCoffee, VscSignOut, VscSettingsGear, VscSnake } from "react-icons/vsc";




const Navbar = () => {
  const user = useSelector((state) => state.profile.user);
  console.log("USER",user)
  
  const avatarUrl=user?.displayPicture;

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandler=()=>{
    dispatch(logout(navigate));
  }

  

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
    
      <FaHeart fontSize={25}/> 

       <MdDarkMode fontSize={29} onClick={handleToggle}/> 
         {/* Dark Mode Icon have to make it functions when we re putting theme */}


    <div className="relative">
      <Dropdown className='dark:bg-confettiDarkColor1 rounded-md px-1' arrowIcon={false} inline={true}
        label={
          <button
            type="button"
            className="flex text-md rounded-full md:me-0"
          >
            <span className="sr-only">Open user menu</span>
            {user?.displayPicture ? (
          <img className="w-[32px] h-[32px] object-cover rounded-full" src={user?.displayPicture} alt="user photo" />
        ) : (
          <RxAvatar className="rounded-full" fontSize={29} />
        )}
          </button>
        }
      >
        <div className='px-5 py-2 flex flex-col rounded-md bg-confettiLightColor3 text-black dark:text-white dark:bg-confettiDarkColor3'>

        <div className="flex flex-row justify-center cursor-pointer gap-4 p-3  min-w-[200px]  border-b dark:border-confettiLightColor1 border-black  mb-4">
          <VscSnake className='mt-1'/>
          <span className="block text-md ">
            {user ? "hi " + user.name : "Welcome"}
          </span>

        </div>
        <div className='flex flex-row justify-center gap-4 p-3 '>
          <VscSettingsGear className='mt-1'/>
          <Link to="/settings" className="block cursor-pointer text-md hover:underline">
            Settings
          </Link>
        </div>
        <div className='flex flex-row justify-center gap-4 p-3 '>
          <VscSignOut className='mt-1'/>
          <div onClick={logoutHandler} className="block cursor-pointer text-md hover:underline">
            {'Logout' }
          </div>
        </div>
        <div className='flex flex-row justify-center gap-4 p-3 '>
          <VscCoffee className='mt-1'/>
          <Link to="/coffee" className="block cursor-pointer text-md hover:underline">
            Buy us a coffee
          </Link>
        </div>
        </div>
      </Dropdown>
    </div>
  </div>
  </div>
</motion.div>

  )
}

export default Navbar