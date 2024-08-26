import React, { useEffect, useState } from 'react'
import confetti from "../../../../assets/notifConfetti.svg"
import message from "../../../../assets/notifMessage.svg"
import { Link } from 'react-router-dom'
import { Dropdown } from 'flowbite-react';
import { FaHeart } from "react-icons/fa";
import "./notification.css"
import {useSelector} from "react-redux"
import { db } from '../../../../firebase';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';

const Notification = () => {
  const [notifications,setNotifications]=useState([]);
  const {user}=useSelector((state)=>state?.profile);
  console.log("Notifications:",notifications);
  useEffect(()=>{
    if (user) {
      const notfRef=collection(db,"Notifications",user?._id,"notifications");
      const q=query(notfRef,orderBy("createdAt","desc"))
      const unsubscribe=onSnapshot(q,(snap)=>{
        const newNotif=snap?.docs?.map((doc)=>({id:doc?.id,...doc?.data()}))
        setNotifications(newNotif)
      },(err)=>{
        console.log(err)
      })
      
      return ()=>{
        unsubscribe();
      }

      console.log("Notifications:",notifications);
      
    }
    },[user?._id])
  return (
    <div className="relative ">
      <Dropdown className='dark:bg-confettiDarkColor1 max-h-[400px] w-[280px] rounded-md px-1 overflow-auto no-scrollbar' arrowIcon={false} inline={true}
        label={
          <button
            type="button"
            className=" flex text-md rounded-full md:me-0"
          >
            <span className="sr-only">Open notification tab</span>
            < FaHeart className='hover:cursor-pointer object-fit' fontSize={25} />
            <div className='absolute text-yellow-600 rounded-full animate-bounce right-[-2px] top-[-1px] w-[15px]  bg-yellow-300 font-semibold text-xs z-10'>{notifications.length > 8 ? "9+" : notifications.length+1}</div>
          </button>
        }
      >
        <div className=' px-2 py-2 flex flex-col rounded-md bg-confettiLightColor3 text-black dark:text-white dark:bg-confettiDarkColor3'>

           { notifications?.map((notif, index)=>(
              <div className='flex flex-row justify-center gap-4 p-3 '>
                <img src={notif?.type === 'post' ? confetti : message} className='my-auto w-6' alt="notif"/>
                <Link to={`/feed/${notif?.postId}`} className="block cursor-pointer text-md">
                    {notif?.description}
                </Link>
            </div>
            ))}

            <div className='flex flex-row justify-center gap-4 p-3 '>
                <img src={confetti} className='my-auto w-6 text-yellow-400' alt="notif"/>
                <Link to="/feed/settings" className="block cursor-pointer text-md">
                Welcome to Confetti, where secrets sparkle and surprises unfold!
                </Link>
            </div>            

        </div>
      </Dropdown>
    </div>
  )
}

export default Notification