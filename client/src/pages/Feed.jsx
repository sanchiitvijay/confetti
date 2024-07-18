import React, { useEffect } from 'react'
import Navbar from '../components/core/Home/Navbar'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';


const Feed = () => {
  const {token}=useSelector((state)=>state.auth)
  const navigate = useNavigate()
    
  // useEffect(()=>{
 
  //   if(!token){
  //     navigate("/")
  //   }
  // },[token,navigate])
 

  return (
    <div>
      <Navbar/>






    <Outlet/>
    </div>
  )
}

export default Feed