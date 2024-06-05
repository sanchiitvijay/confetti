import React from 'react'
import heroImage from "../assets/touch.jpg"
import { TypeAnimation } from 'react-type-animation';
import Button from '../components/common/Button';
const Home = () => { 
  return (
    <div className='w-11/12 mt-10 mx-auto  text-cFont'>
        
        {/* Hero Section */}
        <div className='flex flex-row justify-between w-full '>

            {/* Text of Hero */}
            <div>
            <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed once, initially
                'Open up to a world of Confessions',
                1000,
                'Open up to a world of Feelings',
                1000,
                'Open up to a world of Affections',
                1000,
                'Open up to a world of Friendships',
                1000,
            ]}
            speed={50}
            style={{ fontSize: '2em' }}
            repeat={Infinity}
            />

            </div>

            {/* Image of Hero */}
            <div className='w-[50%] h-[50%]'>
                <img src={heroImage} className="object-fit" alt="" />

            </div>






        </div>
    </div>
  )
}

export default Home