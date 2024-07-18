import React from 'react'
import Navbar from '../components/core/Home/Navbar'

const Feed = () => {
  const {token}=useSelector((state)=>state.auth)
  const navigate = useNavigate()
    
  useEffect(()=>{
 
    if(!token){
      navigate("/login")
    }
  },[token,navigate])
 
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Feed