import React, { memo, useState } from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../../services/operations/commentAPI';
import { VscSend } from "react-icons/vsc";
import Reply from './Reply';
import { createReply, getAllReplies } from '../../../../services/operations/replyAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { setReplies } from '../../../../slices/replySlice';

const Comment = memo(function Comment(props){
  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reply = useSelector((state) => state.reply.reply);

  const param = useParams();
  let tempreplyidentifier = false;
  if (param?.postid) {
    tempreplyidentifier = true;
  }

  
  const [showReply, setShowReply] = useState(false);
  const [writeReply, setWriteReply] = useState(false);
  const [replyForm, setReplyForm] = useState("");
  
  const deleteCommentHandler = async () => {
    dispatch(deleteComment(token, {postId: props.post, commentId: props._id}));
  }

  const submitReplyHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(createReply(token, {commentId: props._id, description: replyForm}));
    setReplyForm("");
    setShowReply(true);
    setWriteReply(false)

  }

  const showReplyHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!showReply) {
      dispatch(getAllReplies(token, {commentId: props._id}));
      if(!tempreplyidentifier) {
        navigate(`/feed/${props.post}`)
      }
    }
    // else {
    //   // dispatch(setReplies([]))
    // }
    setShowReply(!showReply);
  }


  return (
    <>
      <div className='flex flex-row max-w-[500px] justify-between pt-2'>
          <div className='flex flex-row gap-3'>
          <img src={props?.author?.displayPicture} alt={props?.author?.username} className='w-[28px] border border-black rounded-full h-[28px] '/>
          <div className='text-[12px] font-light my-auto'><span className='text-sm font-semibold mr-2'> { props?.author?.username } </span>{ props?.description }</div>
          </div>
          {
            user ?(
              user?._id === props?.author?._id &&
              <MdOutlineDelete fontSize={'25px'}  className='my-auto mr-1' onClick={deleteCommentHandler}/>):(<></>)
            }
        </div>
        <div className='ml-10 my-3'>
          <span onClick = {() => setWriteReply(!writeReply)} className='text-sm mr-8'>Reply </span>
          <span onClick = {showReplyHandle} className='text-sm'>Show all replies </span>
          {
            writeReply && 
            <form onSubmit={submitReplyHandle}>
              <div className='flex flex-row gap-5 pb-4 pt-2 px-1'>

                <input type='text' placeholder='Add a reply' value={replyForm} disabled={user?._id === "66d9f75d5950dde630be7c3c"}  onChange={(e) => setReplyForm(e?.target?.value)} className='w-full h-9 border text-black border-black rounded-md p-2 focus:ring-0 focus:outline-none  focus:border-black focus:shadow-lg' />
                <button type="submit"><VscSend fontSize={30} className='my-auto'/></button>
              </div>
            </form>
          }
          {
            (reply[0]?.comment === props?._id || reply.length === 0) && (reply? 
            reply?.map((reply) => {
              return <Reply key={reply._id} {...reply} />
            }) : <div className='text-center'>No replies</div>)
          }
        </div>
    </>
  )
})

export default Comment