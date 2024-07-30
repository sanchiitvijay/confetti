import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/core/Home/Navbar'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import useOnClickOutsideProfile from '../hooks/useOnClickOutsideProfile';
import { MdSpaceDashboard } from 'react-icons/md';
import Sidebar from "../components/core/Feed/Sidebar"
import Post from '../components/core/Feed/Post';

const Feed = () => {
  
  const {token}=useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const {loading:authLoading}=useSelector((state)=>state.auth);
  const {loading:profileLoading}=useSelector((state)=>state.profile);
  const [show,setShow]=useState(false);
  const showRef=useRef();
  const stickRef=useRef();
  const showHandler=()=>{
    setShow(false);
  }

  useOnClickOutsideProfile(showRef,stickRef,showHandler);

  
  
 
  if(profileLoading || authLoading){
    return (
      <div>
        <Spinner/>
      </div>
    )
  }
  
  // useEffect(()=>{
 
  //   if(!token){
  //     navigate("/")
  //   }
  // },[token,navigate])
 


  

  return (
    <div className='bg-confettiYellowColor1 dark:bg-confettiDarkColor1' >
      <Navbar/>
      <div className="flex flex-row">
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <div ref={showRef} className={`z-30 ${show?`left-0`:`-left-96`} sm:relative sm:left-0 absolute transition-all duration-500 `}>
          <Sidebar/>
        </div>
        <button onClick={()=>{
          setShow(!show);
        }} 
        ref={stickRef}
        className=" fixed bottom-4 right-10  shadow-2xl  hover:scale-95 transition-all duration-200  z-40 p-5 rounded-full  bg-yellow-50 sm:hidden">
          <MdSpaceDashboard fontSize={20}/>
        </button>
        <div className="h-[calc(100vh-3.5rem)] w-full overflow-auto">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <Outlet/>
          </div>
        </div>
      </div>
      <div className=''>
        <Post/>
      </div>
    </div>
    </div>
  )
}

export default Feed