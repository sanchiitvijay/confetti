import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createPost } from '../../../../services/operations/postAPI';
import SubmitButton from '../../../common/SubmitButton';
import "../Settings/Settings.css"


const CreatePost = memo(function CreatePost(){
  const [maxLen, setMaxLen] = useState(0);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [gradient, setGradient] = useState(0);

  const {user}=useSelector((state)=>state.profile)
  const gradientColor = [
    "bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6"
  ]

    const { register, 
    handleSubmit,
    formState: { errors }, 
    reset 
  } = useForm();
    
  const onSubmitHandle = async (data) => {
    if (data.branch === "Do you know their branch?") {
      data.branch = "";
    }
    if (data.year === "Do you know their year") {
      data.year = "";
    }
    data.color = gradient;
    const result = await dispatch(createPost(token, data));
    if (result.fullfiled){
        reset();
        setOpenMoreInfo(false);
    }
  };

    const years=["Do you know their year","First","Second","Third","Fourth"]
    const branches = ["Do you know their branch?", 'CS','IS','AD','AI','AT','BT','CH','CI','CY','EC','EE','EI','IM','BA','MC','MD','ME','CV']
  

  return (
    <div className='relative mx-auto hover:cursor-pointer shadow-md w-[90%] md:w-[510px] h-max my-3 lg:my-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md'>
      <div className=" bg-white  dark:bg-confettiDarkColor3 my-[2px] h-max dark:text-white  w-[99%] md:w-[500px] mx-auto rounded-md  p-3 md:p-4 pb-3" >
        <form onSubmit={handleSubmit(onSubmitHandle)} className='flex flex-col'>
          <label htmlFor="description" className="text-sm mt-4 px-2">Write Confession</label>
          <input
            type="text"
            placeholder="What is in your mind"
            {...register('description', { required: true, maxLength:500 })}
            onChange={(e) => setMaxLen(e.target.value.length)}
            onClick={() => !openMoreInfo && setOpenMoreInfo(true)}
            className={`w-full rounded-[0.5rem] mt-3 mb-4 focus:ring-0 dark:focus:border-white focus:border-black dark:bg-[#2C333F] p-[12px] pr-6 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA] ${user?._id === "66d9f75d5950dde630be7c3c" ? "disabled" : ""}`}
            disabled={user?._id === "66d9f75d5950dde630be7c3c"} 
            />

          {errors.description && <div className="text-red-500 mb-3 text-xs">This field is required</div>}
          {maxLen > 500 && <div className="text-red-500 mb-3 text-xs">Reached maximum character limit</div>}

          {openMoreInfo && <>
            <label htmlFor="name" className="text-sm mt-4 px-2">Name</label>
            <input
              type="text"
              placeholder="Do you know their name?"
              {...register('name')}
              className="w-full rounded-[0.5rem] mt-3 dark:bg-[#2C333F] focus:ring-0 dark:focus:border-white focus:border-black p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
              disabled={user?._id === "66d9f75d5950dde630be7c3c"} 
            />

            <div className='flex lg:flex-row flex-col max-md:gap-3 justify-between '>


            <div className="flex flex-col gap-2 lg:w-[48%] w-full">
              <label htmlFor="year" className="text-[14px] mt-4 leading-[22px] font-[400] dark:text-white">
                Year
              </label>
              <select
                name="year"
                id="year"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] dark:bg-[#2C333F] mt-3 focus:ring-0 dark:focus:border-white focus:border-black p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
                {...register("year")}
                defaultValue="" 
                disabled={user?._id === "66d9f75d5950dde630be7c3c"} 
              >
                {/* <option value="" className='hidden' disabled>Do you know their year?</option> */}
                {years.map((ele, i) => 
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                )}
              </select>
            </div>


            <div className="flex flex-col gap-2 lg:w-[48%] w-full">
              <label htmlFor="branch" className="text-[14px] mt-4 leading-[22px] font-[400] dark:text-white">
                Branch
              </label>
              <select
                type="text"
                name="branch"
                id="branch"
                placeholder="Do you know their branch?"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] dark:bg-[#2C333F] focus:ring-0 dark:focus:border-white focus:border-black mt-3 p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
                {...register("branch")}
                disabled={user?._id === "66d9f75d5950dde630be7c3c"} 
                
              >
                {branches.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
            </div>

            </div>
            <div className=' flex max-lg:gap-1 max-lg:mt-7  flex-col md:flex-row justify-between'>
            <div className="my-auto md:gap-4 flex flex-row justify-around">
              {gradientColor.map((ele, i) => {
                 return (
                  <button 
                    key={i} 
                    onClick={(e) => {
                      e.preventDefault();
                      setGradient(i);
                    }} 
                    className={`rounded-full ${i === gradient && "border-2 border-slate-700 dark:border-white"} h-[25px] w-[25px] ${ele}`} 
                    tabIndex="0" 
                  >
                  </button>
                )
              })
            }
            </div>
            <div className="grid place-items-end mt-5 mb-3">
              <SubmitButton type="submit" text="Post" on/>
            </div>
            </div>

          </>}
        </form>
      </div>
      </div>
  );
})

export default CreatePost;
