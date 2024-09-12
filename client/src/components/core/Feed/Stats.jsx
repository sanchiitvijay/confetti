import React, { useEffect, useState } from 'react'
import "./Settings/Settings.css"
import gold from '../../../assets/gold.png'
import silver from '../../../assets/silver.png'
import bronze from '../../../assets/bronze.png'
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';


const Stats = () => {
  const [postCount,setPostCount]=useState([]);
  const [likeCount,setLikeCount]=useState([]);

  /******************************************Firestore***********************************/ 
  useEffect(()=>{
    const postRef=collection(db,"userPosts");
    const likeRef=collection(db,"Post");

    const qPost=query(postRef,orderBy("posts","desc"));
    const qLike=query(likeRef,orderBy("likes","desc"));

    const unsubscribe1=onSnapshot(qPost,(snap)=>{
        const posts=[]
        snap.forEach((doc)=>{
            posts.push({id:doc.id,...doc.data()});
        })
        setPostCount(posts);
    },(err)=>{
        console.log("Error while listening to real time updates for top posts",err)
    });
    const unsubscribe2=onSnapshot(qLike,(snap)=>{
        const posts=[];
        snap.forEach((doc)=>{
            posts.push({id:doc.id,...doc.data()});
        })
        setLikeCount(posts);
    },(err)=>{});

    return ()=>{
        unsubscribe1();
        unsubscribe2();
    }

  },[])
  return (
    <div className='text-black dark:text-white text-center overflow-auto break-words mx-auto w-[90%]'>
        <p className='text-2xl mb-4 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mt-2'>Leaderboard</p>
        <div className='flex flex-col text-sm gap-5 items-center justify-evenly'>

            {/* 1st component */}
            <div className='bg-gradient-to-r w-full mb-2 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                <div className='rounded-md p-1 bg-white dark:bg-confettiDarkColor3'>
                    <p className=' mb-2 text-lg'>Top confessor</p>

                    {/* map isme lgana hai */}
                    {
                        postCount?.slice(0,5)?.map((post, index) => (
                            <div className='flex place-content-center gap-2 flex-row mt-2' key={index}>
                                {
                                    index === 0 ? (
                                        <img src={gold} alt='gold' className='w-[18px] h-[18px]'/>
                                    ) : index === 1 ? (
                                        <img src={silver} alt='silver' className='w-[18px] h-[18px]'/>
                                    ) : index === 2 ? (
                                        <img src={bronze} alt='bronze' className='w-[18px] h-[18px] '/>
                                    ) : (
                                        <p className='w-[18px] h-[18px]'>{index + 1}</p>
                                    )
                                }
                                <div className='gap-4 flex flex-row'>
                                    <img src={post?.dp} alt={post?.author} className='w-[32px] h-[32px] my-auto rounded-full border-black dark:border-white border'/>
                                    <div className='text-left my-auto'>
                                        <p>{post?.author}</p>
                                        <p className='text-xs font-light'>Post Count: {post?.posts}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            {/* 2nd component */}
            <div className='bg-gradient-to-r w-full mb-2 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                <div className='rounded-md p-1 bg-white dark:bg-confettiDarkColor3'>
                    <p className='mb-2 text-lg'>Top liked posts</p>

                    {/* map isme lagana hai */}
                    {
                        likeCount?.slice(0,5)?.map((post, index) => (
                            <div className='flex place-content-center gap-2 flex-row mt-2' key={index}>
                            {
                                index === 0 ? (
                                    <img src={gold} alt='gold' className='w-[18px] h-[18px]'/>
                                ) : index === 1 ? (
                                    <img src={silver} alt='silver' className='w-[18px] h-[18px]'/>
                                ) : index === 2 ? (
                                    <img src={bronze} alt='bronze' className='w-[18px] h-[18px] '/>
                                ) : (
                                    <p className='w-[18px] h-[18px]'>{index + 1}</p>
                                )
                            }
                            <div className='gap-4 flex flex-row'>
                               <img src={post?.dp} alt={post?.author} className='w-[32px] h-[32px] my-auto rounded-full border-black dark:border-white border'/>
                                <div className='text-left my-auto'>
                                    <p>{post?.author}</p>
                                    <p className='text-xs font-light'>Likes Count: {post?.likes}</p>
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