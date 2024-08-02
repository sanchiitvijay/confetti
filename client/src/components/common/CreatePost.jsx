import React, { useState } from 'react'
import { setPost } from '../../slices/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../services/operations/postAPI'

const CreatePost = () => {
    const [openMoreInfo, setOpenMoreInfo] = useState(false)
    const [post, setPost] = useState({
        description: "",
        name: "",
        year: "",
        branch: "",
    })
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)
    const {
        description,
        name,
        year,
        branch,
    } = post
    const handlePost = (e) => {
        e.preventDefault()
        setOpenMoreInfo(false)
        dispatch(createPost(token, post))
    }


    const handleOnChange = (e) => {
        setPost((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

  return (
    <div>
        <div className='border dark:text-white w-max md:w-[500px] bg-confettiLightColor2 dark:bg-confettiDarkColor3 border-black rounded-md m-3 md:m-12 p-3 md:p-4 pb-3'>
            <label htmlFor="post" className="text-sm px-2" >Write Confession</label>
            <input type="text" placeholder="What is in your mind" name="description"  onClick={() => !openMoreInfo && setOpenMoreInfo(true)}  onChange={handleOnChange} className="border border-black dark:border-white my-2 rounded-md p-2 h-12 w-full"/>

            {
                openMoreInfo && <> 
                <label htmlFor="post" className="text-sm px-2">Name</label>
            <input type="text" onChange={handleOnChange} placeholder="Do you know their name?" name="name" className="border border-black dark:border-white  my-2  text-xs md:text-sm rounded-md p-2 h-8 w-full"/>

            <div className='flex flex-row max-md:gap-3 justify-between '>
                <div className='flex flex-col'>
                    <label htmlFor="post" className="text-sm pl-2">Year</label>
                    <input type="text" onChange={handleOnChange} placeholder="do you know their year?" name="year" className="border border-black my-2 dark:border-white text-xs md:text-sm rounded-md h-8 w-max"/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="post" className="text-sm pl-2">Branch</label>
                    <input type="text" onChange={handleOnChange} placeholder="do you know their branch?" name="branch" className="border border-black my-2 dark:border-white  text-xs md:text-sm rounded-md h-8 w-full"/>
                </div>
            </div>
            <div className='mr-1 flex flex-row-reverse'>
                <button className='dark:bg-confettiDarkColor4 border border-black dark:border-white text-black dark:text-white  bg-confettiLightColor4 rounded-md px-3 py-1 my-2' onClick={handlePost}>Post</button>
            </div>
            </>
            }
        </div>
    </div>
  )
}

export default CreatePost