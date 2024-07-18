import React from 'react'
import gif404 from "../assets/gif404.gif"

const Page404 = () => {
  return (
    <>
      <div className="flex flex-col text-white bg-confettiGrey2 items-center justify-center h-screen">
        <img src={gif404} width={700} alt="404" className='rounded-lg' />
        <h1 className="text-4xl mt-12 font-bold">404 Page Not Found</h1>
        <h2 className="text-2xl mt-10 font-semibold">You think you're uncovering a secret page, but sucks to be you there isn't one. Haha</h2>
      </div>
    </>
  )
}

export default Page404