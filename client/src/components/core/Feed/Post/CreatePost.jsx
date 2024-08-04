import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createPost } from '../../../../services/operations/postAPI';
import SubmitButton from '../../../common/SubmitButton';

const CreatePost = () => {
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const { register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
    } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(createPost(token, data));
    if (result.fullfiled){
        reset();
        setOpenMoreInfo(false);
    }
  };

  
    const years=["First","Second","Third","Fourth"]
    const branches = ['CS','IS','AD','AI','AT','BT','CH','CI','CY','EC','EE','EI','IM','BA','MC','MD','ME','CV']
  

  return (
    <div>
      <div className='border dark:text-white w-full md:w-[500px] bg-confettiLightColor2 mx-auto dark:bg-confettiDarkColor3 border-black rounded-md m-3 lg:my-8 p-3 md:p-4 pb-3'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <label htmlFor="description" className="text-sm mt-4 px-2">Write Confession</label>
          <input
            type="text"
            placeholder="What is in your mind"
            {...register('description', { required: true })}
            onClick={() => !openMoreInfo && setOpenMoreInfo(true)}
            className="w-full rounded-[0.5rem] mt-3 mb-4 focus:ring-0 dark:focus:border-white focus:border-black dark:bg-[#2C333F] p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
          />
          {errors.description && <div className="text-red-500 mb-3 text-xs">This field is required</div>}

          {openMoreInfo && <>
            <label htmlFor="name" className="text-sm mt-4 px-2">Name</label>
            <input
              type="text"
              placeholder="Do you know their name?"
              {...register('name')}
              className="w-full rounded-[0.5rem] mt-3 dark:bg-[#2C333F] focus:ring-0 dark:focus:border-white focus:border-black p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
            />

            <div className='flex lg:flex-row flex-col max-md:gap-3 justify-between '>


            <div className="flex flex-col gap-2 lg:w-[48%] w-full">
              <label htmlFor="year" className="text-[14px] mt-4 leading-[22px] font-[400] dark:text-white">
                Year
              </label>
              <select
                type="text"
                name="year"
                id="year"
                placeholder="Do you know their year?"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] dark:bg-[#2C333F] mt-3 focus:ring-0 dark:focus:border-white focus:border-black p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
                {...register("year")}
              >
                {years.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
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


        
            <div className='mt-4 flex flex-row-reverse'>
            <SubmitButton type="submit" text="Post"/>
            </div>

          </>}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
