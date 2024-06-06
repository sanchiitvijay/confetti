import React, { useEffect, useState } from 'react'
import logo from "../../assets/confetti.png"
import { useSelector } from 'react-redux'
import {Link, Navigate, matchPath, useLocation, useNavigate} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import Button from './Button';
import heart from "../../assets/heartwing.png"

// const links=[
//   {
//     index:0,
//     title:"Home",
//     url:"/"
//   },
//   {
//     index:1,
//     title:"About Us",
//     url:"/aboutus"
//   },
//   { 
//     index:2,
//     title:"Explore",
//     url:"/explore"
//   }
// ]

const Nav = () => {
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const location=useLocation();
  const matchRoute=()=>{
    if(location.pathname==="/"){
      return true;
    }
    else{
      return false;
    }
  }
  console.log("INFO:",matchRoute());
  console.log("LOCATION:",location.pathname)

  return (
    
     <div  className='w-11/12 mx-auto flex justify-between'>
           
           {/* Logo */}
           <div onClick={()=>navigate("/")} className='w-[100px] h-[100px] hover:cursor-pointer'>
            <img src={logo} className='w-fit object-cover ' alt="" />                    
            </div>  

            {/* Links */}
            <div className='w-[100px]'>
              {/* {
                links.map((link)=>(
                  <Link key={link.index} className="hover:text-yellow-300 duration-100 transition-all" to={link.url}>{link.title}</Link>
                ))
              } */}
              {/* <img src={heart} alt="heartwings" /> */}
            </div>

              {/* Buttons and Menu */}
            <div className='flex items-center justify-center'>

              {
                !token?
                (
                  <div >
                      {/* Buttons Here */}
                      <div className='hidden  md:flex flex-row gap-3 items-center '>
                        {
                          matchRoute()?(
                            <Button text={"Sign Up"} nav={"/signup"}/>
                          ):(
                           
                            <Button text={"Log In"} nav={"/"}/>
                          )
                        }
                        
                       
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