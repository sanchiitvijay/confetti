import React from 'react'
import "./Settings/Settings.css"
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderboard } from '../../../services/operations/userAPI';
import gold from '../../../assets/gold.png'
import silver from '../../../assets/silver.png'
import bronze from '../../../assets/bronze.png'


const Stats = () => {
  const topLikes = useSelector((state) => state.profile.topLikes);
  const topPost = useSelector((state) => state.profile.topPost);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  
    if(topLikes.length === 0 && topPost.length === 0){
        dispatch(getLeaderboard(token));
      }


  return (
    <div className='text-black dark:text-white text-center p-2 w-full'>
        <p className='text-2xl mb-3 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent  '>Leaderboard</p>
        <div className='flex flex-col text-sm gap-5 items-center justify-evenly'>

            {/* 1st component */}
            <div className='bg-gradient-to-r w-full mb-2 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                <div className='rounded-md p-2 bg-white dark:bg-confettiDarkColor3'>
                    <p className=' mb-3'>Top liked posts</p>

                    {/* map isme lgana hai */}
                    {
                        topLikes?.map((post, index) => (
                            <div className='flex place-content-center gap-2 flex-row mt-2' key={index}>
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
                                    <img src={post?.displayPicture} alt={post?.username} className='w-[32px] h-[32px] my-auto rounded-full border-black dark:border-white border'/>
                                    <div className='text-left my-auto'>
                                        <p>{post?.username}</p>
                                        <p className='text-xs'>Likes Count: {post?.likes?.length}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            {/* 2nd component */}
            <div className='bg-gradient-to-r w-full mb-2 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                <div className='rounded-md p-2 bg-white dark:bg-confettiDarkColor3'>
                    <p className='mb-3'>Top posts count</p>

                    {/* map isme lagana hai */}
                    {
                        topPost?.map((post, index) => (
                            <div className='flex place-content-center gap-2 flex-row mt-2' key={index}>
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
                               <img src={post?.displayPicture} alt={post?.username} className='w-[32px] h-[32px] my-auto rounded-full border-black dark:border-white border'/>
                                <div className='text-left my-auto'>
                                    <p>{post?.username}</p>
                                    <p className='text-xs'>Posts Count: {post?.posts?.length}</p>
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