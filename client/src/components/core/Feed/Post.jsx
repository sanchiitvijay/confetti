import React, { useState } from 'react'
import logo from "../../../assets/confettiNoText.png"
import { VscSend } from "react-icons/vsc";
import { IoShareSocialOutline, IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { liked } from '../../../services/operations/likeAPI';
import { reportPost } from '../../../services/operations/postAPI';
import { createComments, getAllComments } from '../../../services/operations/commentAPI';
import { FaHeart } from "react-icons/fa";
import { setTotalLikes } from '../../../slices/postSlice';
import Comment from '../../common/Comment';
import PostHeader from '../../common/PostHeader';




const Post = () => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(false);
  // const likes = useSelector((state) => state.post.totalLikes);
  const token = useSelector((state) => state.auth.token);
  const post = useSelector((state) => state.post);
  const profile = useSelector((state) => state.profile);
  const [like, setLike] = useState(false);

  const [comment, setComment] = useState("");

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
    setComments(!comments);
    dispatch(getAllComments(token, post));
  }

  const handleSubmitComment = () => {
    console.log("handle submit comment------------------", comment); 
    dispatch(createComments(token, { post: post?._id, comment }));
  }


  return (
    <div className='border dark:text-white  md:w-[500px] bg-confettiLightColor2 dark:bg-confettiDarkColor3 border-black rounded-md m-3 md:m-12 p-3 md:p-4 pb-3'>
      {/* post header */}
        <PostHeader/>

      {/* content */}
      <div className='p-3 md:p-4 min-h-[200px] text-center text-lg md:text-xl content-center border-black dark:border-white border-b'>
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
        comments &&
        <div className='max-md:px-2 p-4 border-t border-black mt-2'>
          <div className='flex flex-row gap-5 pb-4 pt-2 px-1'>
              <input type='text' placeholder='Add a comment' onChange={(e)=>setComment(e.target.value)} className='w-full h-9 border border-black rounded-md p-2 focus:ring-0 focus:outline-none  focus:border-black focus:shadow-lg'/>
              <VscSend fontSize={30} className='my-auto' onClick={handleSubmitComment}/>
            </div>
          <Comment/>
      </div>
      }
    </div>
  );  
}

export default Post;