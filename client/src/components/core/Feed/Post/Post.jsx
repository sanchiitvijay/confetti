import React, { useState, useEffect, memo } from 'react';
import { VscSend } from "react-icons/vsc";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { liked } from '../../../../services/operations/likeAPI';
import { createComments, deleteComment, getAllComments } from '../../../../services/operations/commentAPI';
import { FaHeart } from "react-icons/fa";
import Comment from './Comment';
import PostHeader from './PostHeader';
import { useNavigate } from 'react-router-dom';
import ShareModal from './ShareModal';
import toast from 'react-hot-toast';
import { setPost } from '../../../../slices/postSlice';

const Post = memo(function Post(props){
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [showComments, setShowComments] = useState(props?.showAllComment || false);
  const [allComments, setAllComments] = useState(props?.showAllComment || false);
  const [like, setLike] = useState(false);
  const [commentForm, setCommentForm] = useState("");
  const [totalLikes, setTotalLikes] = useState(props?.likes.length || 0);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);

  const gradientColor = [
    "bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6"
  ]

  const { post } = useSelector((state) => state.post);
  const token = useSelector((state) => state.auth.token);
  // const { comment } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.profile);


  useEffect(() => {
    const posts = post.filter((p) => p?._id === props?._id);
    const likes = posts[0]?.likes || [];
    const isLiked = likes.some((like) => like?.author === user?._id);

    setLike(isLiked);

  }, [post, props?._id, user?._id]);

  useEffect(() => { 
    comment.length > 0 && comment[0]?.post !== props?._id && setShowComments(false);
  } , [comment])


  const likeHandler = async () => {
    let toastId='';
       if(like){
         toastId=toast.loading("unliking..");
       }
        else{
          toastId=toast.loading("liking..");
        }
    
      await dispatch(liked(token, { postId: props?._id }));
      const newLikeState = !like;
      setLike(newLikeState);
      await setTotalLikes((prevLikes) => newLikeState ? prevLikes + 1 : prevLikes - 1);
    

      const updatedPosts = post.map((p) => {
        if (p._id === props?._id) {
            return {
                ...p,
                likes: newLikeState
                    ? [...p.likes, {
                        post: p._id,
                        author: user?._id,
                        _id: new Date().toISOString(), 
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        __v: 0
                    }]
                    : p.likes.filter((like) => like.author !== user?._id),
            };
        }
        return p;
      })


      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      toast.dismiss(toastId);
  };
  


  useEffect(() => {
    const commentHandler = async () => {
      if (showComments) {
        setLoading(true);
        const postId = props?._id;
        setAllComments(false);
        setComment(await dispatch(getAllComments(token, postId)));
        setLoading(false);
      }
    };
    commentHandler();
  }, [showComments, props?._id]);

  const redirectionHandler = () => {
    navigate("/feed/" + props?._id);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    await dispatch(createComments(token, { postId: props?._id, comment: commentForm }));
    setCommentForm("");
  };


  const deleteCommentHandler = async (commentId) => {
    await dispatch(deleteComment(token, { postId: props?._id, commentId }));
    
    // Update localStorage
    const storedPosts = localStorage.getItem("post");
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      
      // Find the specific post and remove the comment
      const updatedPosts = posts.map(post => {
        if (post._id === props?._id) {
          return {
            ...post,
            comments: post.comments.filter(id => id !== commentId)
          };
        }
        return post;
      });
      
      // Save the updated posts back to localStorage
      localStorage.setItem("post", JSON.stringify(updatedPosts));
    }
    
    // Update the component state if needed
    setComment(prevComments => prevComments.filter(id => id !== commentId));

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
          <button onClick={likeHandler}>
          {
            like ?
            <FaHeart color={"#DE3163"} fontSize={'23px'} />
            :
            <IoMdHeartEmpty fontSize={'23px'}/>
          }
          </button>

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
        showComments && loading &&
        <div className='text-center'>Loading...</div>
      }
      {
        showComments && !loading &&

        <div className='max-md:px-2 p-4 border-t max-h-[200px] overflow-auto border-black mt-2'>
          <form onSubmit={handleSubmitComment}>
            <div className='flex flex-row gap-5 pb-4 pt-2 px-1'>
              <input type='text' placeholder='Add a comment' value={commentForm} disabled={user?._id === "66d9f75d5950dde630be7c3c"}   onChange={(e) => setCommentForm(e.target.value)} className='w-full h-9 border text-black border-black rounded-md p-2 focus:ring-0 focus:outline-none  focus:border-black focus:shadow-lg' />
              <button type="submit"><VscSend fontSize={30} className='my-auto'/></button>
            </div>
          </form>
          {comment?.length > 0 ? 
            comment.slice(0, Math.min(4, comment.length)).map((com) => (
              <div key={com?.id}>
              <Comment key={com?._id} {...com} onDelete={() => deleteCommentHandler(com?._id)} />
              </div>
            )) : 
            <div className='text-center'>No comments</div>
          }
          {comment?.length > 4 && (
            !allComments ? 
              <div className='text-center text-xs cursor-pointer' onClick={() => setAllComments(true)}>
                View all comments
              </div> : 
              comment.slice(4).map((com) => (
                <div key={com?.id}>
                  <Comment {...com} onDelete={() => deleteCommentHandler(com?._id)}/>
                </div>
              ))
          )}

        </div>
      }
    </div>
  );
});

export default Post;
