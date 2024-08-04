import React from 'react'
import { useSelector } from 'react-redux'
import SubmitButton from '../../common/SubmitButton'
import { Link } from 'react-router-dom'

const MyProfile = () => {
  const user = useSelector(user=>user.profile.user)

  return (
    <div className='flex flex-col  text-black dark:text-white'>
      <div className='flex flex-row text-xl justify-between p-8 rounded-md h-max'>

      <div className='text-xl my-auto  h-max'>Your Profile</div>
      <Link to='/edit-profile'>
      <SubmitButton text='Edit Profile'/>
      </Link>
      </div>
    <div className='mx-auto flex flex-col text-lg text-black dark:bg-confettiDarkColor3 shadow-lg bg-confettiLightColor4 dark:text-white p-8 rounded-md my-6 item-center border-spacing-6 border-8 h-max border-black dark:border-white '>
      {/* <hr className='mt-2 mb-6 border-1 border-black dark:border-white bg-black '/> */}

      <div className='flex flex-row gap-6'>

      <div className=''>
        <img src={user.displayPicture} alt="" className='w-[80px] m-4 h-[80px] rounded-full border  border-black dark:border-white object-cover'/>
      <div>{"@" + user.username}</div>
      </div>
      <div className='my-auto space-y-3 text-center'>
        <div>{user.email}</div>
        <div>{user.name}</div>
      </div>
      </div>
      <hr className='my-5 border-1 border-black dark:border-white bg-black '/>
    <div className='flex flex-row justify-between'>

      <div>
        <div className='flex flex-row gap-4'><div className='font-light text-md'>Branch:</div>{user?.branch}</div>
        <div className='flex flex-row gap-4'> <div className='font-light text-md'>Year:</div>{user.year}</div>
      </div>

      <div>
        <div className='flex flex-row gap-4'><div className='font-light text-md'>Gender:</div>{user.gender}</div>
        <div className='flex flex-row gap-4'><div className='font-light text-md'>Instagram: </div> {user.instagram || "Null"}</div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default MyProfile