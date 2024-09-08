import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/core/Feed/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import useOnClickOutsideProfile from '../hooks/useOnClickOutsideProfile';
import { MdSpaceDashboard } from 'react-icons/md';
import Sidebar from "../components/core/Feed/Sidebar"
import Stats from '../components/core/Feed/Stats';
import "../components/core/Feed/sidebar.css"
import Loader from '../components/common/Loader';
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';
import { handleDevice } from '../services/operations/notificationAPI';
// import useThrottle from '../hooks/useThrottle';
import { auth } from '../firebase';
import { signInAnonymously } from 'firebase/auth';

const Feed = () => {
  const { token } = useSelector((state) => state.auth)
  const { device } = useSelector((state) => state.notification);
  const navigate = useNavigate()
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, user } = useSelector((state) => state.profile);
  const [show, setShow] = useState(false);
  const showRef = useRef();
  const stickRef = useRef();
  const showHandler = () => {
    setShow(false);
  }
  const dispatch=useDispatch();
  

  useEffect(() => {

    if (!token) {
      navigate("/")
    }

 
  }, [token, navigate])

  console.log("enviorenment",process.env)
  useOnClickOutsideProfile(showRef, stickRef, showHandler);


  //firebase push notifs code
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    //By Defualt three kind of permissions->granted,default,denied

    console.log("Permission Type:",permission);
    
    if (permission === 'granted') {
      //Generate the token
      if (!device) {
        try{
        const vapidKey=process.env.REACT_APP_FIREBASE_VAPID_KEY;
        const deviceToken = await getToken(messaging, { vapidKey});
        console.log("====11111=====", deviceToken)
        const combinedString = navigator.userAgent + "|" + navigator.hardwareConcurrency + "|" + deviceToken;
        console.log("====2222======", combinedString)
        dispatch(handleDevice(user?._id,token,combinedString));
        console.log("Device token:",deviceToken)
        }catch(err){
          console.log("registering device error:",err);
        }
      }

      else {
        console.log("Device already present in slice")
      }
    }

    else if (permission === 'denied') {
      alert("You denied for notification");
    }
  }

   

  console.log("Current Device:",device);
  useEffect(() => {
    //req user for notification permission
    requestPermission();
  }, [])


  if (profileLoading || authLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  return (
    <div className='bg-confettiYellowColor1 relative dark:bg-confettiDarkColor1 overflow-hidden' >
      <Navbar />
      <div className="flex relative w-full flex-row">
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
          <div ref={showRef} className={`z-30 container ${show ? `left-0 ` : `-left-96 `} sm:relative  absolute sm:left-0 transition-all duration-500 `}>
            <Sidebar />
          </div>
          <button onClick={() => {
            setShow(!show);
          }}
            ref={stickRef}
            className=" fixed bottom-4 right-10  shadow-2xl  hover:scale-95 transition-all duration-200  z-40 p-5 rounded-full dark:bg-[#fff9d8] bg-[#ffe865] sm:hidden">
            <MdSpaceDashboard fontSize={20} />
          </button>

        </div>

        <div className="h-[calc(100vh-3.5rem)] w-full flex justify-center overflow-auto ">
          <Outlet />
        </div>

        <div className="max-lg:hidden min-h-[calc(100vh-3.5rem)] overflow-auto w-[300px] z-10">
          <Stats />
        </div>

      </div>
    </div>
  )
}

export default Feed