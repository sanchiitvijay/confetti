import React, { useState, useEffect } from 'react';
import { VscSend } from "react-icons/vsc";
import { IoShareSocialOutline, IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { liked } from '../../../../services/operations/likeAPI';
import { createComments, getAllComments } from '../../../../services/operations/commentAPI';
import { FaHeart } from "react-icons/fa";
import Comment from './Comment';
import PostHeader from './PostHeader';

const Post = (props) => {
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);
  const [allComments, setAllComments] = useState(false);
  const [like, setLike] = useState(false);
  const [commentForm, setCommentForm] = useState("");

  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.profile);
  const { post } = useSelector((state) => state.post);
  const {comment} = useSelector((state) => state.comment);
  let likes = props.likes;

  // console.log("rpofiles-------------------",profile)
  const posts = post.filter((p) => p?._id === props?._id);
    // console.log("posts-------------------",posts)
    likes = posts[0]?.likes;
    // console.log("likes-------------------",likes)
    if (likes?.includes(profile?.user?._id)) {
      // console.log("liked kra hai-------------------")
      setLike(true);
    }

  const likeHandler = () => {
    dispatch(liked(token, {postId: props?._id}));
    setLike(!like);
    if (like) {
      likes++;
    } else {
      like--;
    }
  }


  useEffect(()=>{
    const commentHandler = async () => {
      if (showComments) {
        const postId = props?._id;
        setAllComments(false);
        const result=dispatch(getAllComments(token, postId))
      
      }}
    commentHandler();

  },[showComments])

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const comments = await dispatch(createComments(token, { postId: props?._id, comment: commentForm }));
    setCommentForm(" ");
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
          {
            props.likes.length > 0 && <div className=' ml-[-4px] content-center my-auto'>{likes.length}</div>
          }
          <IoChatbubbleOutline fontSize={'20px'} className='my-auto' onClick={()=>{setShowComments(!showComments)}} />
          {
            props.comments.length > 0 && <div className='ml-[-3px] content-center my-auto'>{props.comments.length}</div>
          }
          <IoShareSocialOutline fontSize={'18px'}  className='my-auto'/>
        </div>
        <div className='content-center text-xs'>{props.createdAt.substring(0,10)}</div>
      </div>

      {/* showComments */}
      {
        showComments &&
        <div className='max-md:px-2 p-4 border-t max-h-[200px] overflow-auto border-black mt-2'>
          <form onSubmit={handleSubmitComment}>
          <div className='flex flex-row gap-5 pb-4 pt-2 px-1'>

            <input type='text' placeholder='Add a comment' value={commentForm} onChange={(e) => setCommentForm(e.target.value)} className='w-full h-9 border text-black border-black rounded-md p-2 focus:ring-0 focus:outline-none  focus:border-black focus:shadow-lg' />
            <button type="submit" onClick={handleSubmitComment}><VscSend fontSize={30} className='my-auto'/></button>
          </div>
            </form>
          {comment.length > 0 ? 
            comment.slice(0, Math.min(4, comment.length)).map((com) => (
              <Comment key={com._id} {...com} />
            )) : 
            <div className='text-center'>No comments</div>
          }
          {comment.length > 4 && (
            !allComments ? 
              <div className='text-center text-xs cursor-pointer  *:' onClick={() => setAllComments(true)}>
                View all comments
              </div> : 
              comment.slice(4).map((com) => (
                <Comment key={com._id} {...com} />
              ))
          )}

        </div>
      }
    </div>
  );
}

export default Post;
