import React, { Suspense, useEffect, useState } from 'react'
import "./../components/core/Feed/Settings/Settings.css"
import { useSelector } from 'react-redux';
import gold from './../assets/gold.png'
import silver from './../assets/silver.png'
import bronze from './../assets/bronze.png' 
import "../components/core/Feed/MyProfile.css"
import Loader from '../components/common/Loader';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const Stats = () => {
    const token = useSelector((state) => state.auth.token);

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
    <Suspense fallback={<Loader/>}>
        <div className='text-black dark:text-white text-center w-[90%]'>
            <p className='text-4xl m-7 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black '>Leaderboard</p>
            <div className='flex md:flex-row-reverse flex-col-reverse gap-5 items-center justify-evenly'>

                {/* 1st component */}
                <div className='bg-gradient-to-r w-[75%] lg:w-[32%] gap-y-5 mb-5 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                    <div className='rounded-md p-4 bg-white dark:bg-confettiDarkColor3'>
                        <p className='text-xl mb-7'>Top liked posts</p>

                        {/* map isme lgana hai */}
                        {likeCount?.slice(0,5)?.map((like, index) => (
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
                            <img src={like?.dp} alt={like?.author} className='w-[50px] h-[50px] rounded-full border-black dark:border-white border'/>
                            <div className='text-left'>
                                <p className='my-auto'>{like?.author}</p>
                                <p className='my-auto'>Likes Count: {like?.likes}</p>
                            </div>
                        </div>
                    </div>
                        ))}
                    </div>
                </div>

                {/* 2nd component */}
                <div className='bg-gradient-to-r w-[75%] lg:w-[32%] mb-5 from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
                    <div className='rounded-md p-4 bg-white dark:bg-confettiDarkColor3'>
                        <p className='text-xl mb-7'>Top posts count</p>

                        {/* map isme lagana hai */}
                        {
                            postCount?.slice(0,5)?.map((post, index) => (
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
                                        <img src={post?.dp} alt={post?.author} className='w-[50px] h-[50px] rounded-full border-black dark:border-white border'/>
                                        <div className='text-left'>
                                            <p className='my-auto'>{post?.author}</p>
                                            <p className='my-auto'>Post Count: {post?.posts}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </Suspense>
  )
}

export default Stats