import React, { useState, useEffect } from 'react';
import { VscSend } from "react-icons/vsc";
import { IoShareSocialOutline, IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { liked } from '../../../../services/operations/likeAPI';
import { createComments, getAllComments } from '../../../../services/operations/commentAPI';
import { FaHeart } from "react-icons/fa";
import { setComments, setTotalLikes } from '../../../../slices/postSlice';
import Comment from '../../../common/Comment';
import PostHeader from '../../../common/PostHeader';

const Post = (props) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.profile);
  const {comment} = useSelector((state) => state.comment);

  const [like, setLike] = useState(false);
  const [commentForm, setCommentForm] = useState("");
 


  useEffect(() => {
    if (props?.likes?.includes(profile?.user?._id)) {
      setLike(true);
    }
  }, [props?.likes, profile?.user?._id]);

  const likeHandler = () => {
    let updatedLikes;
    if (props?.likes?.includes(profile?.user?._id)) {
      updatedLikes = props?.likes.filter((like) => like !== profile?.user?._id);
      setLike(false);
    } else {
      updatedLikes = [...props.likes, profile?.user?._id];
      setLike(true);
    }

    dispatch(setTotalLikes(updatedLikes));
    dispatch(liked(token, props));
  }


  

  useEffect(()=>{
    const commentHandler = async () => {
      if (showComments) {
        const postId = props?._id;
        // console.log("POST ID IN POST COMPONENT", postId);
        const result=dispatch(getAllComments(token, postId))
      
      }}
    commentHandler();

  },[showComments])
  // console.log("props in post--------------", props)

  const handleSubmitComment = async () => {
    // console.log("COMMENT", commentForm);
    const comments = await dispatch(createComments(token, { postId: props?._id, commentForm }));
    // const comments = useSelector((state) => state.comment);
    // console.log("COMMENTS-----------------", comments);
    setCommentForm(" ");
    dispatch(getAllComments(token, props));
  }

  return (
    <div className='border dark:text-white mx-auto md:w-[500px] w-full bg-confettiLightColor2 dark:bg-confettiDarkColor3 border-black rounded-md my-3 md:my-12 p-3 md:p-4 pb-3'>
      {/* post header */}
      <PostHeader props={props} />

      {/* content */}
      <div className='p-3 md:p-4 min-h-[200px] text-center text-lg md:text-xl content-center border-black dark:border-white border-b'>
        {props?.description}
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
          <IoChatbubbleOutline fontSize={'20px'} onClick={()=>{setShowComments(!showComments)}} />
          <IoShareSocialOutline fontSize={'18px'} />
        </div>
        <div className='content-center text-xs'>{props.createdAt.substring(0,10)}</div>
      </div>

      {/* showComments */}
      {
        showComments &&
        <div className='max-md:px-2 p-4 border-t border-black mt-2'>
          <div className='flex flex-row gap-5 pb-4 pt-2 px-1'>
            <input type='text' placeholder='Add a comment' value={commentForm} onChange={(e) => setCommentForm(e.target.value)} className='w-full h-9 border border-black rounded-md p-2 focus:ring-0 focus:outline-none  focus:border-black focus:shadow-lg' />
            <VscSend fontSize={30} className='my-auto' onClick={handleSubmitComment} />
          </div>
          {
            comment.length > 0 ? comment.map((com) => (
              <Comment key={com._id} {...com} />
            )) : <div className='text-center'>No comments</div>
          }
        </div>
      }
    </div>
  );
}

export default Post;
