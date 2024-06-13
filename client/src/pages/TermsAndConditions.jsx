import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import logo from "../assets/confetti.png"
import downArrow from "../assets/arrowDown.svg"

const TermsAndConditions = () => {
    const tnc= [
        {
        heading:"Confidentiality",
        description:"We strive to maintain user anonymity. Confessions are posted without usernames or identifying information.However, we cannot guarantee complete anonymity. There's always a risk someone might guess your identity based on the content of your confession."
        },
        {
        heading:"Acceptable Use",
        description:"You may only post confessions related to your college experience. Harassment, bullying, threats, hate speech, or defamation of any kind are not tolerated. Posting false information or inciting violence is also prohibited.",
        },
        {
        heading:"Moderation",
        description:"We reserve the right to remove any content that violates these terms and conditions. We may also remove content that we deem inappropriate or harmful to the community.",
        },
        {
        heading:"Disclaimer",
        description:"We are not responsible for the content posted by users. You are solely responsible for the content of your confessions. We are not liable for any damages arising from the use of this website.",
        },
        {
        heading:"Termination of Service",
        description:"We may terminate your access to the website at any time without notice if you violate these terms and conditions.",
        },
        {
        heading:"Additional Notes",
        description:"By using this website, you acknowledge that confessions may be upsetting or offensive. You agree to use the website at your own risk.",
        },
        {
        heading:"College Specifics",
        description:"We may have additional terms and conditions specific to your college.These may include restrictions on content related to specific departments, organizations, or events. Please check with your college administration for any additional guidelines. Please be responsible and respectful when using this platform. We encourage you to use your voice for positive change, not to spread negativity or harm others.",
        }
    ]
  return (
    <div className='w-full h-full mx-auto text-cFont p-5 md:p-10'>
        <div className='lg:w-[90%] mx-auto bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400 text-white p-5 md:p-16'>
            <div className='flex flex-col-reverse md:flex-row'>

            <div className='text-2xl md:text-4xl w-full text-normal  text-center'>Terms and Conditions for Confetti</div>
            <img src={logo} className='relative mt-0.5 h-[100px] w-[100px] md:h-[60px] md:w-[60px] mx-auto' alt=""/>
            </div>
            <div className='text-xl md:text-2xl my-6  text-justify'>Welcome to Confetti! This platform allows you to anonymously share confessions related to your college experience. By using our service, you agree to these terms and conditions.</div>
            <ul>
                {tnc.map((data) => (
                    <li key={data.heading} className='my-5 mx-3'>
                        <div className='flex flex-row  mb-2'>
                            <MdKeyboardDoubleArrowRight className='mt-1.5 mr-2'/>
                            <div className='text-lg md:text-xl'>{data.heading}:</div>
                        </div>
                        <div className='flex flex-row ml-4'>
                        <img src={downArrow} className='mt-0.5 h-[15px] w-[15px]' alt=""/>
                        <p className=' text-justify text-md text-gray-200 ml-2 font-light'>{data.description}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <p className='mx-3 my-2 text-justify font-light'>
                <span className='font-semibold mr-3'>
                Contact:
                </span>
                 If you have any questions about these terms and conditions, please contact us at
                    <span className='font-semibold mx-2'>
                     confetti.site01@gmail.com
                    </span>
                </p>
            <p className='m-3 font-light text-justify'>We appreciate your cooperation! By using Confetti, you agree to these terms and conditions.</p>
        </div>
    </div>
  )
}

export default TermsAndConditions