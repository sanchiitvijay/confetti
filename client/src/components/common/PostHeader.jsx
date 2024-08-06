import React from 'react'
import logo from "../../assets/confettiNoText.png"
import { VscGripper, VscKebabVertical } from "react-icons/vsc";
import { Dropdown } from 'flowbite-react';
import { reportPost } from '../../services/operations/postAPI';
import { useDispatch, useSelector } from 'react-redux';


const PostHeader = ({props}) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    // console.log("props---------------------",props)
    const reportHandler = () => {
        dispatch(reportPost(token, ...props));
      }
    


  return (
    <div className='flex flex-row border-b border-black dark:border-white pb-3 justify-between'>
        <div className='flex flex-row gap-3'>
          <img
            src={props?.author?.displayPicture || logo}
            className='w-[40px] h-[40px] object-fill rounded-full border border-confettiDarkColor1 dark:border-confettiLightColor1'
            alt='img'
          />
          <div className='flex flex-col'>
            <h1 className='font-semibold text-sm'>{props?.author?.username ||"Anonymous"}</h1>
            <p className='text-xs'>{props.createdAt.substring(11,19) || "Time"}</p>
          </div>
        </div>

        <Dropdown
          className='dark:bg-confettiDarkColor1 rounded-md'
          arrowIcon={false}
          inline={true}
          label={
            <button
              type='button'
              className='flex text-md rounded-full md:me-0'
            >
              <span className='sr-only'>Open user menu</span>
              <VscGripper
                className='my-auto'
                fontSize={'30px'}
              />
            </button>
          }
        >

          <div className='px-5 py-2 flex flex-col rounded-md mx-1 bg-confettiLightColor3 text-black dark:text-white dark:bg-confettiDarkColor3'>
            <div className='flex flex-row justify-center '>
              <div className='block cursor-pointer text-sm hover:underline' onClick={reportHandler}>
                Report
              </div>
            </div>
          </div>
        </Dropdown>

      </div>
  )
}

export default PostHeader