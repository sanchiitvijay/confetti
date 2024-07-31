import React, { useState } from 'react'
import logo from "../../../assets/confettiNoText.png"
import { VscGripper, VscKebabVertical } from "react-icons/vsc";
import { IoShareSocialOutline, IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { liked } from '../../../services/operations/likeAPI';
import { reportPost } from '../../../services/operations/postAPI';
import { getAllComments } from '../../../services/operations/commentAPI';
import { Dropdown } from 'flowbite-react';
import { FaHeart } from "react-icons/fa";
import { setTotalLikes } from '../../../slices/postSlice';








const Post = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(false);
  // const likes = useSelector((state) => state.post.totalLikes);
  const token = useSelector((state) => state.auth.token);
  const post = useSelector((state) => state.post);
  const profile = useSelector((state) => state.profile);
  const [like, setLike] = useState(false);

  if (post?.likes?.includes(profile?.user?._id)) {
    setLike(true);
  }

  const likeHandler = () => {
    if (post?.likes?.includes(profile?.user?._id)) {
      post.likes = post.likes.filter((like) => like !== profile?.user?._id);
      setLike(false);
    } else {
      post.likes.push(profile?.user?._id);
      setLike(true);
    }

    dispatch(setTotalLikes(post.likes));
    
    dispatch(liked(token, post));
  }

  const commentHandler = () => {
    setComment(!comment);
    dispatch(getAllComments(token, post));
  }

  const reportHandler = () => {
    dispatch(reportPost(token, post));
  }

  return (
    <div className='border dark:text-white w-[500px] bg-confettiLightColor2 dark:bg-confettiDarkColor3 border-black rounded-md m-12 p-4 pb-3'>
      {/* post header */}
      <div className='flex flex-row border-b border-black dark:border-white pb-3 justify-between'>
        <div className='flex flex-row gap-3'>
          <img
            src={logo}
            className='w-[40px] h-[40px] object-fill rounded-full border border-confettiDarkColor1 dark:border-confettiLightColor1'
            alt='img'
          />
          <div className='flex flex-col'>
            <h1 className='font-semibold text-sm'>username</h1>
            <p className='text-xs'>college</p>
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


  
      {/* content */}
      <div className='p-4 min-h-[200px] text-center text-xl content-center border-black dark:border-white border-b'>
        Remember, contributions to this repository should follow our GitHub Community Guidelines. Trying to avoid encountering the strangest and most random errors while compiling the code. Trying to avoid encountering the strangest and most random errors while compiling the code. Trying to avoid encountering the strangest and most random errors while compiling the code.
      </div>
      


      {/* footer */}
      <div className='flex pt-2 justify-between px-5 flex-row'>
        <div className='flex gap-3 content-center flex-row'>
          {
            like ?
              <FaHeart color={"#DE3163"} fontSize={'23px'} onClick={likeHandler} />
              :
              <IoMdHeartEmpty fontSize={'23px'} onClick={likeHandler} />
          }
          <IoChatbubbleOutline fontSize={'20px'} onClick={commentHandler}/>
          <IoShareSocialOutline fontSize={'18px'} />
        </div>
        <div className='content-center text-xs'>Time</div>
      </div>

      {/* comments */}
      {
        comment &&
        <div className='p-4 border-t border-black mt-2'>
        <div className='flex flex-row justify-between py-2'>
          <div className='flex flex-row gap-3'>
          <img src={logo} alt="" className='w-[28px] border border-black rounded-full h-[28px] '/>
          <div className='text-[10px] my-auto'><span className='text-xs font-semibold mr-2'> Username: </span>Comment</div>
          </div>
          <VscKebabVertical fontSize={'20px'}  className='my-auto mr-1'/>
      </div>
        
       
      </div>
      }
    </div>
  );  
}

export default Post;