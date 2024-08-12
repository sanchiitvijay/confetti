import React from 'react'
import confetti from "../../../../assets/notifConfetti.svg"
import message from "../../../../assets/notifMessage.svg"
import { Link } from 'react-router-dom'
import { Dropdown } from 'flowbite-react';
import { FaHeart } from "react-icons/fa";
import "./notification.css"

const Notification = () => {
  return (
    <div className="relative ">
      <Dropdown className='dark:bg-confettiDarkColor1 max-h-[400px] w-[280px] rounded-md px-1 overflow-auto no-scrollbar' arrowIcon={false} inline={true}
        label={
          <button
            type="button"
            className="flex text-md rounded-full md:me-0"
          >
            <span className="sr-only">Open notification tab</span>
            < FaHeart className='hover:cursor-pointer' fontSize={25} />
          </button>
        }
      >
        <div className=' px-2 py-2 flex flex-col rounded-md bg-confettiLightColor3 text-black dark:text-white dark:bg-confettiDarkColor3'>

            <div className='flex flex-row justify-center gap-4 p-3 '>
                <img src={message} className='my-auto w-6' alt="notif"/>
                <Link to="/feed/settings" className="block cursor-pointer text-md hover:underline">
                    Someone commented on your post
                </Link>
            </div>

            <div className='flex flex-row justify-center gap-4 p-3 '>
                <img src={message} className='my-auto w-6' alt="notif"/>
                <Link to="/feed/settings" className="block cursor-pointer text-md hover:underline">
                    Someone replied to your comment
                </Link>
            </div>

            <div className='flex flex-row justify-center gap-4 p-3 '>
                <img src={confetti} className='my-auto w-6 text-yellow-400' alt="notif"/>
                <Link to="/feed/settings" className="block cursor-pointer text-md hover:underline">
                Welcome to Confetti, where secrets sparkle and surprises unfold!
                </Link>
            </div>

            <div className='flex flex-row justify-center gap-4 p-3 '>
                <img src={confetti} className='my-auto w-6' alt="notif"/>
                <Link to="/feed/settings" className="block cursor-pointer text-md hover:underline">
                    Oh looks like someone posted a confession for you!
                </Link>
            </div>
            
            

        </div>
      </Dropdown>
    </div>
  )
}

export default Notification