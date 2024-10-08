import React from 'react'
import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from '../../../common/IconBtn'
import { updateDisplayPicture } from '../../../../services/operations/userAPI'
import  "./Settings.css"
import { LiaCloudUploadAltSolid } from "react-icons/lia";


const ChangeDp = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
  
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [isHovered, setIsHovered] = useState(false);
    const [previewSource, setPreviewSource] = useState(null)
  
    const fileInputRef = useRef(null)
  
    const handleClick = () => {
      fileInputRef.current.click()
    }
  
    const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file) {
        setImageFile(file)
        previewFile(file)
      }
    }
  
    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }
  
    const handleFileUpload = () => {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append("displayPicture", imageFile)
        dispatch(updateDisplayPicture(token, formData)).then(() => {
          setLoading(false)
        })
      } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
      }
    }

  
    useEffect(() => {
      if (imageFile) {
        previewFile(imageFile)
      }
    }, [imageFile])
    return (
      <div className='my-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md' >
       
        <div className="flex items-center justify-between rounded-md bg-white dark:bg-confettiDarkColor3 p-8 md:px-12 text-richblack-5">
          <div className="flex items-center gap-x-8 sm:gap-x-4">
            <div className='relative'
              onMouseEnter={() => !isHovered && setIsHovered(true)}
              onMouseLeave={() => isHovered && setIsHovered(false)}
            >

            <img
              src={previewSource || user?.displayPicture}
              alt={`profile-${user?.name}`}
              className="aspect-square w-[78px] rounded-full object-cover"
              onclick={handleFileUpload}
            />
            {isHovered && (
              <div 
              onClick={handleClick}
              className='absolute my-auto mx-auto place-content-center top-0 left-0 w-[78px] h-[78px] opacity-15  bg-black dark:bg-white rounded-full'
              >
                <LiaCloudUploadAltSolid 
                className='my-auto mx-auto place-content-center text-white dark:text-black rounded-full' 
                fontSize={40}
                
                />
               </div>
              )
          }
            </div>

            <div className="space-y-2">
              <p>Change Profile Picture</p>
              <div className="flex  flex-col sm:flex-row gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/gif, image/jpeg"
                  disabled={user?._id === "66d9f75d5950dde630be7c3c"} 
                />
                <button
                  onClick={handleClick}
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                  Select
                </button>
                <IconBtn
                  text={loading ? "Uploading..." : "Upload"}
                  onclick={handleFileUpload}
                  
                >
                  {!loading && (
                    <FiUpload  fontSize={20} className="text-lg my-auto text-richblack-900" />
                  )}
                </IconBtn>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    )
  }

export default ChangeDp