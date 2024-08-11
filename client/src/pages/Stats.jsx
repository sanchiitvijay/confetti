import React from 'react'
import logo from "../assets/confettiNoText.png"
import "./../components/core/Feed/Settings/Settings.css"
import { LuBadge } from "react-icons/lu";

const Stats = () => {
  return (
    <div className='text-white text-center w-[90%]'>
        <p className='text-2xl m-7'>Leaderboard</p>
        <div className='flex md:flex-row flex-col gap-5 items-center justify-evenly'>

            {/* 1st component */}
            <div className='bg-gradient-to-r w-[80%] lg:w-[40%] gap-y-5 mb-5 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                <div className='rounded-md p-8 bg-white dark:bg-confettiDarkColor3'>
                    <p className='text-lg mb-5'>Top liked posts</p>

                    {/* map isme lgana hai */}
                    <div className='flex place-content-center flex-row gap-4 mt-5'>
                        <LuBadge className='' fontSize={20}/>
                        <img src={logo} alt="" className='w-[50px] h-[50px] rounded-full border-white border'/>
                        <div className='text-left'>
                        <p className='my-auto'>username</p>
                        <p className='my-auto'>Likes Count: 3</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2nd component */}
            <div className='bg-gradient-to-r w-[80%] lg:w-[40%] mb-5 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                <div className='rounded-md p-8 bg-white dark:bg-confettiDarkColor3'>
                    <p className='text-lg mb-5'>Top posts count</p>

                    {/* map isme lagana hai */}
                    <div className='flex place-content-center flex-row gap-4 mt-5'>
                        <img src={logo} alt="" className='w-[50px] h-[50px] rounded-full border-white border'/>
                        <div className='text-left'>
                        <p className='my-auto'>username</p>
                        <p className='my-auto'>Post Count: 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Stats