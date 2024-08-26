import React, { Suspense } from 'react'
import Loader from '../components/common/Loader'
import { VscCoffee } from "react-icons/vsc";
import qr_sanchit from '../assets/qr_sanchiitvijay.png'
import qr_ashutosh from "../assets/qr_ashutoshkumar.png"
import coffeeCup from "../assets/coffeeCup.gif"

const BuyUsACoffee = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <div className='text-black max-lg:w-[90%]  dark:text-white'>
        <div className='flex my-10 text-yellow-500 place-items-center justify-center mx-auto flex-row gap-4 '>
            <div className='text-3xl font-bold'>Buy Us Coffee </div>
            <img src={coffeeCup} className='my-auto w-[44px]'/>
          </div>
          <div className='flex flex-col-reverse'>

          <div className='flex flex-col gap-y-4 md:flex-row justify-between lg:gap-10'>
            <img src={qr_sanchit} alt="qr_sanchit" className='mx-auto border border-black dark:border-none w-[80%] md:w-[40%] lg:w-[250px] rounded-md'/>
            <img src={qr_ashutosh} alt="qr_ashutosh" className='mx-auto border border-black dark:border-none w-[80%] md:w-[40%] lg:w-[250px] rounded-md'/>
          </div>
          <p className='text-yellow-500 mb-5 md:text-lg ml-4 my-3'>
            Love our work? Fuel Our Creativity. Buy us a virtual coffee! <br/>
            Your support helps us to make new features and keep it seamless for everyone. <br/>
            Even small contributions make a big difference.  <br/>
            Thanks for your support!<br/>
            <span className='font-semibold text-xl my-4'>Confetti Team 🎉</span>
          </p>
          </div>
      </div>
    </Suspense>
  )
}

export default BuyUsACoffee