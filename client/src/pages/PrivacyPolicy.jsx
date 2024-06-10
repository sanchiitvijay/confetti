import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import logo from "../assets/confetti.png"
import downArrow from "../assets/arrowDown.svg"

const PrivacyPolicy = () => {
    const policies= [
        {
        heading:"Information We Collect",
        description:"We do not collect any personal information IP address or location. We may collect non-personally identifiable information, such as the type of device you use, your browsing activity on our website, and general demographic information. This information is used to improve our service and understand how users interact with the platform."
        },
        {
        heading:"Use of Information",
        description:"We use the non-personally identifiable information we collect to Operate and maintain the website, Analyze website usage trends, Improve the user experience",
        },
        {
        heading:"Disclosure of Information",
        description:"We will not share your personal information with any third party without your consent. We may disclose non-personally identifiable information in aggregate form to third-party service providers who help us operate the website.",
        },
        {
        heading:"Cookies",
        description:"We may use cookies to store information about your preferences and to track user behavior on our website. You can choose to disable cookies in your browser settings.",
        },
        {
        heading:"Data Retention",
        description:"We will only retain your information for as long as necessary to fulfill the purposes described in this privacy policy.",
        },
        {
        heading:"Security",
        description:"We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website can guarantee complete security..",
        },
        {
        heading:"Your Rights",
        description:"You have the right to access and correct any inaccurate information we may hold about you.",
        },
        {
        heading:"Changes to this Privacy Policy",
        description:"We may update this privacy policy from time to time. We will notify you of any changes by posting the updated policy on our website.",
        }
    ]

  return (
    <div className='w-full h-full mx-auto text-cFont p-5 md:p-15'>
        <div className='lg:w-[90%] mx-auto bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400 text-white p-5 md:p-10'>
            <div className='flex flex-col-reverse md:flex-row'>

            <div className='text-2xl md:text-4xl w-full text-normal text-center'>Privacy Policy for Confetti</div>
            <img src={logo} className='relative mt-0.5 h-[100px] w-[100px] md:h-[60px] md:w-[60px] mx-auto right-3' alt=""/>
            </div>
            <div className='text-xl md:text-2xl my-6 text-justify'>Welcome to Confetti! We take your privacy seriously. This privacy policy explains how we collect, use, and disclose information from and about you when you use our website.</div>
            <ul>
                {policies.map((policy) => (
                    <li key={policy.heading} className='my-5 mx-3'>
                        <div className='flex flex-row  mb-2'>
                            <MdKeyboardDoubleArrowRight className='mt-1.5 mr-2'/>
                            <div className='text-lg md:text-xl'>{policy.heading}:</div>
                        </div>
                        <div className='flex flex-row ml-4'>
                        <img src={downArrow} className='mt-0.5 h-[15px] w-[15px]' alt=""/>
                        <p className=' text-justify text-md text-gray-200 ml-2 font-light'>{policy.description}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <p className='mx-3 my-2 text-justify font-light'>
                <span className='font-semibold mr-3'>
                Contact:
                </span>
                If you have any questions about this privacy policy, please contact us at
                    <span className='font-semibold mx-2'>
                     confetti.site01@gmail.com
                    </span>
                </p>
            <p className='m-3 font-light text-justify'>We appreciate your cooperation! By using Confetti, you agree to these terms and conditions.</p>
        </div>
    </div>
  )
}

export default PrivacyPolicy