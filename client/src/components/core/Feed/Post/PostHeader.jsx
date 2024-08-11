import React, { useState } from 'react'
import logo from "../../../../assets/confettiNoText.png"
import { VscGripper, VscKebabVertical } from "react-icons/vsc";
import { Dropdown } from 'flowbite-react';
import { deletePost, reportPost } from '../../../../services/operations/postAPI';
import { useDispatch, useSelector } from 'react-redux';
import EditPostModal from './EditPostModal';
import { TbMessageReport } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const PostHeader = ({props}) => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector(state=>state.profile.user)

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);


    const reportHandler = () => {
        dispatch(reportPost(token, {postId: props?._id}));
      }
    
      const deleteHandler = () => {
        dispatch(deletePost(token, {postId: props?._id}));
      }

  return (
    <div className='flex flex-row pb-3 justify-between'>
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

          <div className='px-5 gap-y-3 py-2 flex flex-col rounded-md mx-1 bg-confettiLightColor3 text-black dark:text-white dark:bg-confettiDarkColor3'>
            {
              user?._id === props?.author?._id && <>

                
                  <div className='flex flex-row cursor-pointer gap-2 mx-auto text-sm hover:underline' onClick={() => (setModal(!modal))}>
                    <FiEdit className='mx-auto ' fontSize={16}/>Edit
                  </div>
                
                
                  <div className='flex flex-row cursor-pointer gap-2 mx-auto text-sm hover:underline' onClick={deleteHandler}>
                    <AiOutlineDelete className='mx-auto ' fontSize={17}/>Delete
                  </div>
                
            </>
            }
            {
              user?._id !== props?.author?._id &&
            
              <div className='cursor-pointer flex flex-row gap-2 mx-auto text-sm hover:underline' onClick={reportHandler}>
                <TbMessageReport className='mx-auto ' fontSize={18}/>Report
              </div>
        
            }
          </div>
        </Dropdown>
        {
          modal &&
          <EditPostModal {...props} setModal={setModal}/>
        }
      </div>
  )
}

export default PostHeader