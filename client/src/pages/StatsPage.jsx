import React from 'react'
import "./../components/core/Feed/Settings/Settings.css"
import { useSelector } from 'react-redux';
import gold from './../assets/gold.png'
import silver from './../assets/silver.png'
import bronze from './../assets/bronze.png' 
import "../components/core/Feed/MyProfile.css"


const Stats = () => {

    const topLikes = useSelector((state) => state.profile.topLikes);
    const topPost = useSelector((state) => state.profile.topPost);

  return (
    <div className='text-white text-center w-[90%]'>
        <p className='text-2xl m-7 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black '>Leaderboard</p>
        <div className='flex md:flex-row flex-col gap-5 items-center justify-evenly'>

            {/* 1st component */}
            <div className='bg-gradient-to-r w-[80%] lg:w-[40%] gap-y-5 mb-5 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                <div className='rounded-md p-8 bg-white dark:bg-confettiDarkColor3'>
                    <p className='text-lg mb-5'>Top liked posts</p>

                    {/* map isme lgana hai */}
                    {topLikes?.map((post, index) => (
                    <div className='flex place-content-center gap-2 flex-row mt-5' key={index}>
                    {
                        index === 0 ? (
                            <img src={gold} alt='gold' className='w-[18px] h-[18px]'/>
                        ) : index === 1 ? (
                            <img src={silver} alt='silver' className='w-[18px] h-[18px]'/>
                        ) : index === 2 ? (
                            <img src={bronze} alt='bronze' className='w-[18px] h-[18px] '/>
                        ) : (
                            <p>{index + 1}</p>
                        )
                    }
                    <div className='gap-4 flex flex-row'>
                        <img src={post?.displayPicture} alt={post?.username} className='w-[50px] h-[50px] rounded-full border-black dark:border-white border'/>
                        <div className='text-left'>
                            <p className='my-auto'>{post?.username}</p>
                            <p className='my-auto'>Likes Count: {post?.likes?.length}</p>
                        </div>
                    </div>
                </div>
                    ))}
                </div>
            </div>

            {/* 2nd component */}
            <div className='bg-gradient-to-r w-[80%] lg:w-[40%] mb-5 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                <div className='rounded-md p-8 bg-white dark:bg-confettiDarkColor3'>
                    <p className='text-lg mb-5'>Top posts count</p>

                    {/* map isme lagana hai */}
                    {
                        topPost?.map((post, index) => (
                            <div className='flex place-content-center gap-2 flex-row mt-5' key={index}>
                                {
                                    index === 0 ? (
                                        <img src={gold} alt='gold' className='w-[18px] h-[18px]'/>
                                    ) : index === 1 ? (
                                        <img src={silver} alt='silver' className='w-[18px] h-[18px]'/>
                                    ) : index === 2 ? (
                                        <img src={bronze} alt='bronze' className='w-[18px] h-[18px] '/>
                                    ) : (
                                        <p>{index + 1}</p>
                                    )
                                }
                                <div className='gap-4 flex flex-row'>
                                    <img src={post?.displayPicture} alt={post?.username} className='w-[50px] h-[50px] rounded-full border-black dark:border-white border'/>
                                    <div className='text-left'>
                                        <p className='my-auto'>{post?.username}</p>
                                        <p className='my-auto'>Likes Count: {post?.likes?.length}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Stats