import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'flowbite-react';
import { RxAvatar } from "react-icons/rx";
import { VscCoffee, VscSignOut, VscSettingsGear, VscSnake } from "react-icons/vsc";
import { logout } from '../../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';

const UserDetails = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        dispatch(logout(navigate));
      }
  return (
    <div className="relative">
      <Dropdown className='dark:bg-confettiDarkColor1 rounded-md px-1' arrowIcon={false} inline={true}
        label={
          <button
            type="button"
            className="flex text-md rounded-full md:me-0"
          >
            <span className="sr-only">Open user menu</span>
            {props?.displayPicture ? (
          <img className="w-[32px] h-[32px] object-cover rounded-full" src={props?.displayPicture} alt={props?.username} />
        ) : (
          <RxAvatar className="rounded-full" fontSize={29} />
        )}
          </button>
        }
      >
        <div className='px-5 py-2 flex flex-col rounded-md bg-confettiLightColor3 text-black dark:text-white dark:bg-confettiDarkColor3'>

        <div onClick={()=>{navigate("/feed/my-profile")}} className="flex flex-row hover:underline justify-center cursor-pointer gap-4 p-3  min-w-[200px]  border-b dark:border-confettiLightColor1 border-black  mb-4">
          <VscSnake className='mt-1'/>
          <span className="block text-md">
            {props ? "Hi " + props?.name?.charAt(0).toUpperCase() + props?.name?.slice(1) : "Welcome"}
          </span>

        </div>
        <div className='flex flex-row justify-center gap-4 p-3 '>
          <VscSettingsGear className='mt-1'/>
          <Link to="/feed/settings" className="block cursor-pointer text-md hover:underline">
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
          <Link to="/feed/buy-us-coffee" className="block cursor-pointer text-md hover:underline">
            Buy us a coffee
          </Link>
        </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default UserDetails