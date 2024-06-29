import React from 'react'
import logo from "../../../assets/confettiNoText.png"
import { Link } from 'react-router-dom'
import { MdDarkMode } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { Dropdown } from 'flowbite-react';
import { RxAvatar } from "react-icons/rx";
import { useSelector } from 'react-redux';


const Navbar = () => {
  const user = useSelector((state) => state.profile.user);

  return (
    

<nav className=" border-gray-200 bg-confettiGrey1">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1 md:px-5 px-3">
  <Link href="/feed" className="flex ml-4 items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-[90px] mt-[-10px] mb-[-30px]" alt="Confetti Logo" />
      {/* <span className="self-center justify-center text-2xl font-semibold whitespace-nowrap text-white">Confetti</span> */}
  </Link>  
  <div className='justify-between text-white md:text-[25px] text-2xl'>
    Confetti
  </div>
  <div className="flex items-center  md:order-2 md:gap-4 gap-1 space-x-3 md:space-x-0 mr-3 rtl:space-x-reverse">
    
      <FaHeart fontSize={27} color={'white'}/> 

       <MdDarkMode fontSize={30} color={'white'}/> 
         {/* Dark Mode Icon have to make it functions when we re putting theme */}


    <div className="relative">
      <Dropdown className='bg-confettiGrey2' arrowIcon={false} inline={true}
        label={
          <button
            type="button"
            className="flex text-md rounded-full md:me-0"
          >
            <span className="sr-only">Open user menu</span>
            {user && user.avatar ? (
          <img className="w-[32px] h-[32px] rounded-full" src={user.avatar} alt="user photo" />
        ) : (
          <RxAvatar className="rounded-full" fontSize={31} color={'white'} />
        )}
          </button>
        }
      >
        <div className='px-5'>

        <div className="px-4 py-3 text-center border-b border-white mb-4">
          <span className="block text-md text-white">
            {user ? "hi " + user.name : "Welcome"}
          </span>

        </div>
        <div className='p-3 text-center'>
          <Link to="/settings" className="px-4 py-2 text-md hover:underline text-white">
            Settings
          </Link>
        </div>
        <div className='p-3 text-center'>
          <Link to={user ? "/logout" : "/"} className="block px-4 py-2 text-md hover:underline text-white">
            {user ? 'Logout' : 'Login'}
          </Link>
        </div>
        <div className='p-3 text-center'>
          <Link to="/coffee" className="block px-4 py-2 text-md hover:underline text-white">
            Buy us a coffee
          </Link>
        </div>
        </div>
      </Dropdown>
    </div>
  </div>
  </div>
</nav>

  )
}

export default Navbar