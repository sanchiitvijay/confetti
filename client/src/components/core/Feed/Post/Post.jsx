import React, { useState, useEffect, memo } from 'react';
import { VscSend } from "react-icons/vsc";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { liked } from '../../../../services/operations/likeAPI';
import { createComments, getAllComments } from '../../../../services/operations/commentAPI';
import { FaHeart } from "react-icons/fa";
import Comment from './Comment';
import PostHeader from './PostHeader';
import { useNavigate } from 'react-router-dom';
import ShareModal from './ShareModal';

const Post = memo(function Post(props){
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [showComments, setShowComments] = useState(props?.showAllComment || false);
  const [allComments, setAllComments] = useState(props?.showAllComment || false);
  const [like, setLike] = useState(false);
  const [commentForm, setCommentForm] = useState("");
  const [totalLikes, setTotalLikes] = useState(props?.likes.length || 0);

  const gradientColor = [
    "bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6"
  ]

  const { post } = useSelector((state) => state.post);
  const token = useSelector((state) => state.auth.token);
  const { comment } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.profile);
  useEffect(() => {
    const posts = post.filter((p) => p?._id === props?._id);
    const likes = posts[0]?.likes || [];
    const isLiked = likes.some((like) => like?.author === user?._id);

    setLike(isLiked);
    setTotalLikes(isLiked ? likes.length : likes.length - 1);

  }, [post, props?._id, user?._id]);

  useEffect(() => { 
    comment.length > 0 && comment[0]?.post !== props?._id && setShowComments(false);
  } , [comment])

  const likeHandler = async () => {
    await dispatch(liked(token, { postId: props?._id }));
    setLike(prevLike => {
      const newLikeState = !prevLike;
      setTotalLikes(prevLikes => newLikeState ? prevLikes + 1 : prevLikes - 1);
      return newLikeState;
    });
  
    
  };
  

  useEffect(() => {
    const commentHandler = async () => {
      if (showComments) {
        const postId = props?._id;
        setAllComments(false);
        dispatch(getAllComments(token, postId));
      }
    };
    commentHandler();
  }, [showComments, dispatch, token, props?._id]);

  const redirectionHandler = () => {
    navigate("/feed/" + props?._id);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    await dispatch(createComments(token, { postId: props?._id, comment: commentForm }));
    setCommentForm("");
  };

  return (
    <div className='border drop-shadow-md dark:shadow-pink-50 dark:text-white mx-auto md:w-[500px] w-[95%] bg-confettiLightColor2 dark:bg-confettiDarkColor3 border-black dark:border-slate-500 rounded-md my-3 md:my-12 p-3 md:p-4 pb-3'>
      {/* post header */}
      <PostHeader props={props} />
     
      {/* content */}
      <div onClick={redirectionHandler}
      className={`p-3 md:p-4 min-h-[200px] hover:cursor-pointer text-center text-white  md:text-md content-center ${gradientColor[props?.color]} rounded-md border border-black dark:border-white break-words`}>
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
            totalLikes > 0 && <div className=' ml-[-4px] content-center my-auto'>{totalLikes}</div>
          }

          <IoChatbubbleOutline fontSize={'20px'} className='my-auto' onClick={() => setShowComments(!showComments)} />
          {
            props?.comments?.length > 0 && <div className='ml-[-3px] content-center my-auto'>{props?.comments.length}</div>
          }

          <ShareModal props={props?._id} />
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
              <button type="submit"><VscSend fontSize={30} className='my-auto'/></button>
            </div>
          </form>
          {comment?.length > 0 ? 
            comment.slice(0, Math.min(4, comment.length)).map((com) => (
              <Comment key={com?._id} {...com} />
            )) : 
            <div className='text-center'>No comments</div>
          }
          {comment?.length > 4 && (
            !allComments ? 
              <div className='text-center text-xs cursor-pointer' onClick={() => setAllComments(true)}>
                View all comments
              </div> : 
              comment.slice(4).map((com) => (
                <Comment key={com?._id} {...com} />
              ))
          )}

        </div>
      }
    </div>
  );
});

export default Post;
