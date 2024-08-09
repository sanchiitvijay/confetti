import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubmitButton from '../../common/SubmitButton'
import { Link, useNavigate } from 'react-router-dom'
import { LiaEditSolid } from "react-icons/lia";
import "../Feed/MyProfile.css"
import Tilt from 'react-parallax-tilt';
import { getUserPosts } from '../../../services/operations/postAPI';
const MyProfile = () => {
  const {user} = useSelector(state=>state.profile)
  const {token}=useSelector(state=>state.auth)
  const {post}=useSelector(state=>state.post)
  const navigate = useNavigate()
  const dispatch=useDispatch();

  // useEffect(()=>{
  //   const userPost=post?.filter((p)=>p?.author?._id===user?._id)
  //   const userPostLength=userPost?.length;
  //   console.log("User Posts:",userPostLength);    
  // },[])

  return (
    <div className='flex flex-col items-center w-full text-black dark:text-white'>
      {
          user &&
          (
            <Tilt   
            glareEnable={true} className="mt-10" scale={1.1} glareMaxOpacity={0.4} glareColor="lightblue" glarePosition="all" glareBorderRadius="20px" >
                 <div className='w-fit relative  card flex flex-col md:flex-row md:gap-4 gap-2  shadow-lg dark:bg-card1 bg-dark_card1 bg-cover text-white border-spacing-4 border-4 h-max dark:border-slate-600 border-white p-6 md:p-7 rounded-lg  item-center'>
            <LiaEditSolid className='absolute right-2 top-2 text-[25px] cursor-pointer' onClick={() => navigate("/feed/settings")}/>
            <div className='flex flex-col max-md:mb-3 max-md:mx-auto my-auto'>
              <img src={user?.displayPicture} alt="" className='w-[80px] m-4 h-[80px] rounded-full border border-white object-cover'/>
              <div>{"@" + user?.username}</div>
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row gap-4'><div className='font-light text-md'>Name:</div>{user?.name}</div>
              <div className='flex flex-row gap-4'><div className='font-light text-md'>Email:</div>{user?.email}</div>
              <hr className='my-3 border-white'/>
              <div className='flex flex-row gap-4'><div className='font-light text-md'>Branch:</div>{user?.branch}</div>
              <div className='flex flex-row gap-4'> <div className='font-light text-md'>Year:</div>{user?.year}</div>
              <div className='flex flex-row gap-4'><div className='font-light text-md'>Gender:</div>{user?.gender}</div>
              <div className='flex flex-row gap-4'><div className='font-light text-md'>Instagram: </div> {user?.instagram || "Null"}</div>
              <div className='glow'/>
            </div>
            </div>
            </Tilt>

            
          )
        } 

        {
          user &&
          (
            <div className='background-animate h-36 mt-10 w-[90%] rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1'>
              <div className='bg-confettiDarkColor1 rounded-md px-8 h-full py-4'>
                <h1 className='linear-wipe '>Hi {user?.name}</h1>
                <hr />
                <div className='flex flex-col sm:flex-row justify-between'>
                  <div>
                    <h2>Total Posts</h2>
                    <p></p>
                  </div>
                  
                </div>
              </div>



            </div>




          )


        }

        

    </div>


  )
}

export default MyProfile