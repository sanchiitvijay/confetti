import React, { Suspense } from 'react'
import Navbar from '../components/core/Feed/Navbar/Navbar'
import { Link } from 'react-router-dom'
import Loader from '../components/common/Loader'

const Page404 = () => {
  const gifUrl = "https://res.cloudinary.com/dcnhb3jwv/image/upload/v1723442753/aqwh6igsgkb2of9wfot3.gif"
  return (
    <Suspense fallback={<Loader/>}>
      <div className='overflow-hidden text-center'>
        <Navbar/>
        <div className="flex flex-col dark:text-white text-black bg-white py-10 dark:bg-confettiDarkColor1 items-center">
          <img src={gifUrl} alt="404" className='rounded-lg w-[90%] md:w-[50%]' />
          <h1 className="text-3xl mt-12 font-semibold">404 Page Not Found 🤷🏻‍♂️</h1>
          <p className="  text-xl mt-10">
            You think you're uncovering a secret page, but sucks to be you there isn't one. Haha
            <Link to="/feed" className="text-blue-500"> Go back to Home</Link>
          </p>
        </div>
      </div>
    </Suspense>
  )
}

export default Page404