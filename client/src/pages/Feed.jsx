import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/core/Home/Navbar'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import useOnClickOutsideProfile from '../hooks/useOnClickOutsideProfile';
import { MdSpaceDashboard } from 'react-icons/md';
import Sidebar from "../components/core/Feed/Sidebar"
import Post from '../components/core/Feed/Post';
import CreatePost from '../components/common/CreatePost';

const Feed = () => {
  
  const {token}=useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const {loading:authLoading}=useSelector((state)=>state.auth);
  const {loading:profileLoading}=useSelector((state)=>state.profile);
  const [show,setShow]=useState(false);
  const showRef=useRef();
  const stickRef=useRef();
  const [dashboardShow, setDashboardShow] = useState(window.screen.availWidth > 640);
  const showHandler=()=>{
    setShow(false);
  }

  useEffect(()=>{
 
    if(!token){
      navigate("/")
    }
  },[token,navigate])
 


  const handleResize = () => {
    if (window.screen.availWidth <= 640) {
      setDashboardShow(false);
    } else {
      setDashboardShow(true);
    }
    console.log(window.screen.availWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Call handleResize once to set the initial state
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  useOnClickOutsideProfile(showRef,stickRef,showHandler);

  
  
 
  if(profileLoading || authLoading){
    return (
      <div>
        <Spinner/>
      </div>
    )
  }
  
 

  

  return (
    <div className='bg-confettiYellowColor1 relative dark:bg-confettiDarkColor1' >
      <Navbar/>
      <div className="flex relative w-full flex-row">
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <div className={`w-[200px] ${dashboardShow?("block"):("hidden")}`}> </div>
        <div ref={showRef} className={`z-30 ${show?`left-0 fixed`:`-left-96 fixed`} sm:fixed sm:left-0 transition-all duration-500 `}>
          <Sidebar/>
        </div>
        <button onClick={()=>{
          setShow(!show);
        }} 
        ref={stickRef}
        className=" fixed bottom-4 right-10  shadow-2xl  hover:scale-95 transition-all duration-200  z-40 p-5 rounded-full  bg-yellow-50 sm:hidden">
          <MdSpaceDashboard fontSize={20}/>
        </button>
        
      </div>

      <div className="min-h-[calc(100vh-3.5rem)] w-full flex justify-center ">
            <Outlet />
         
        </div>
      
    </div>
    </div>
  )
}

export default Feed