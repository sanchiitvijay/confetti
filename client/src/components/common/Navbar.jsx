import React from 'react'
import logo from "../../assets/confetti.png"
import { useSelector } from 'react-redux'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import Button from './Button';


const links=[
  {
    index:0,
    title:"Home",
    url:"/"
  },
  {
    index:1,
    title:"About Us",
    url:"/aboutus"
  },
  { 
    index:2,
    title:"Explore",
    url:"/explore"
  }
]

const Nav = () => {
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();

  return (
    
     <div  className='w-11/12 mx-auto flex justify-between'>
           
           {/* Logo */}
           <div onClick={()=>navigate("/")} className='w-[100px] h-[100px] hover:cursor-pointer'>
            <img src={logo} className='w-fit object-cover ' alt="" />                    
            </div>  

            {/* Links */}
            <div className='lg:ml-14 hidden font-roboto items-center text-lg flex-row gap-16 text-cFont justify-evenly md:flex '>
              {
                links.map((link)=>(
                  <Link key={link.index} className="hover:text-yellow-300 duration-100 transition-all" to={link.url}>{link.title}</Link>
                ))
              }
            </div>

              {/* Buttons and Menu */}
            <div className='flex items-center justify-center'>

              {
                !token?
                (
                  <div >
                      {/* Buttons Here */}
                      <div className='hidden  md:flex flex-row gap-3 items-center '>
                        <Button text={"Log In"} nav={"/login"}/>
                        <Button text={"Sign Up"} nav={"/signup"}/>
                        
                      </div>
                  </div>
                )
                :(
                  <div>
                  </div>
                )
              }

            </div>
            

            {/* Burger */}
            <div className='flex flex-row items-center justify-center md:hidden'>
            <GiHamburgerMenu  fontSize={26} className='hover:cursor-pointer text-cFont'/>
            </div>
     </div>
        

  )
}

export default Nav