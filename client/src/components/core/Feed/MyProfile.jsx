import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LiaEditSolid } from "react-icons/lia";
import Tilt from 'react-parallax-tilt';
import { getUserStats } from '../../../services/operations/postAPI';
import "./MyProfile.css"
// import useThrottle from '../../../hooks/useThrottle';
const MyProfile = () => {
  const { user } = useSelector(state => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const [data, setData] = useState({
    postLength: 0,
    likesLength: 0,
    commentsLength: 0,
    reportLength: 0
  })
  
  // Function to animate count-up effect
  const animateCountUp = (target, count, suffix = '', duration = 1000) => {
    let start = 0;
    const increment = count / (duration / 10);
    const updateCounter = () => {
      start += increment;
      if (start >= count) {
        target.textContent = count + suffix;
      } else {
        target.textContent = Math.ceil(start) + suffix;
        requestAnimationFrame(updateCounter);
      }
    };
    requestAnimationFrame(updateCounter);
  }
  async function fetchStats() {
    try {
      const response = await dispatch(getUserStats());
      setData(response);
      console.log("response in my profile-----------", response)
      const targets = [
        { element: document.getElementById('postCount'), count: response.postLength, suffix: '' },
        { element: document.getElementById('likeCount'), count: response.likesLength, suffix: '' },
        { element: document.getElementById('commentCount'), count: response.commentsLength, suffix: '' },
        { element: document.getElementById('reportCount'), count: user?.reports, suffix: '' }
      ];

      targets.forEach(target => {
        if (target.element) {
          animateCountUp(target.element, target.count, target.suffix);
        }
      });
    } catch (err) {
      console.log("User Stats can't be fetched right now", err)
    }
  }
  useEffect(() => {
    fetchStats();
  }, [dispatch]);



  return (
    <div className='flex flex-col pb-10 max-md:flex-col-reverse overflow-auto items-center w-full text-black dark:text-white'>
      {
        user &&
        (
          <div className='background-animate break-all mt-16 w-[90%] rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1'>
            <div className='bg-white dark:bg-confettiDarkColor2  rounded-md p-10 h-fit '>
              <h1 className='text-4xl text-center md:text-left md:text-5xl mb-4' ><span className='animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-4xl md:text-5xl font-black '>Hi {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}</span>{" "}👋</h1>

              <hr className='gradient-line mb-8' />
              <div className='flex flex-col gap-2 sm:gap-0 sm:flex-row justify-around'>

                <div className='flex  flex-col gap-4 '>
                  <div className='text-center'>

                    <p id="postCount" className='order-1 text-4xl md:text-5xl font-extrabold leading-none break-all text-yellow-400 '>{data?.postLength}</p>
                    <h2 className='order-2 mt-2 text-md md:text-lg font-medium leading-6 text-gray-500 dark:text-gray-400'>Total Posts</h2>
                  </div>

                  <div className='text-center'>

                    <p id="likeCount" className='order-1 text-4xl md:text-5xl font-extrabold leading-none break-all text-yellow-400'>{data?.likesLength}</p>
                    <h2 className='order-2 mt-2 text-md md:text-lg font-medium leading-6 text-gray-500  dark:text-gray-400'>Total Likes</h2>
                  </div>
                </div>

                <div className='flex gap-4 flex-col '>
                  <div className='text-center'>

                    <p id="commentCount" className='order-1 text-4xl md:text-5xl font-extrabold leading-none break-all text-yellow-400'>{data?.commentsLength}</p>
                    <h2 className='order-2 mt-2 text-md md:text-lg font-medium leading-6 text-gray-500 dark:text-gray-400'>Total Comments</h2>
                  </div>

                  <div className='text-center'>

                    <p id="reportCount" className='order-1 text-4xl md:text-5xl font-extrabold leading-none break-all text-yellow-400'>{user?.reports}</p>
                    <h2 className='order-2 mt-2 text-md md:text-lg font-medium leading-6 text-gray-500 dark:text-gray-400'>Total Reports</h2>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )
      }
      
      {
        user &&
        (
          <Tilt
            glareEnable={true} className="mt-10" scale={1.1} glareMaxOpacity={0.4} glareColor="lightblue" glarePosition="all" glareBorderRadius="20px" >
            <div className='w-fit relative hover:cursor-pointer card flex flex-col md:flex-row md:gap-4 gap-2  shadow-lg dark:bg-card1 bg-dark_card1 bg-cover text-yellow-950 dark:text-white border-spacing-4 border-4 h-max dark:border-slate-600 border-white p-6 md:p-7 rounded-lg  item-center'>
              <LiaEditSolid className='absolute right-2 top-2 text-[25px] cursor-pointer' onClick={() => navigate("/feed/settings")} />
              <div className='flex flex-col max-md:mb-3 max-md:mx-auto my-auto'>
                <img src={user?.displayPicture} alt={user?.username} className='w-[80px] m-4 h-[80px] font-semibold rounded-full  object-cover' />
                <div>{"@" + user?.username}</div>
              </div>
              <div className='flex flex-col'>
                <div className='flex flex-row gap-4 font-semibold'><div className='font-normal text-md'>Name:</div>{user?.name}</div>
                <div className='flex flex-row gap-4 font-semibold'><div className='font-normal text-md'>Email:</div>{user?.email}</div>
                <hr className='my-3 border-white' />
                <div className='flex flex-row gap-4 font-semibold'><div className='font-normal text-md'>Branch:</div>{user?.branch}</div>
                <div className='flex flex-row gap-4 font-semibold'> <div className='font-normal text-md'>Year:</div>{user?.year}</div>
                <div className='flex flex-row gap-4 font-semibold'><div className='font-normal text-md'>Gender:</div>{user?.gender}</div>
                <div className='flex flex-row gap-4 font-semibold'><div className='font-normal text-md'>Instagram: </div> {user?.instagram || "Null"}</div>
                <div className='glow' />
              </div>
            </div>
          </Tilt>


        )
      }

      
    </div>


  )
}

export default MyProfile