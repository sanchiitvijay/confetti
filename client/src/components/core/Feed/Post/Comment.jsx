import React, { useEffect, useState } from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../../services/operations/commentAPI';
import CreateReply from './Reply/CreateReply';
import { VscSend } from "react-icons/vsc";
import Reply from './Reply/Reply';

const Comment = (props) => {
  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [showReply, setShowReply] = useState(false);
  const [writeReply, setWriteReply] = useState(false);
  const [replyForm, setReplyForm] = useState("");

  const deleteCommentHandler = async () => {
    dispatch(deleteComment(token, {postId: props.post, commentId: props._id}));
  }

  const handleSubmitReply = (e) => {
    e.preventDefault();
    setShowReply(!showReply);
  }


  return (
    <>
      <div className='flex flex-row max-w-[500px] justify-between pt-2'>
          <div className='flex flex-row gap-3'>
          <img src={props.author.displayPicture} alt="" className='w-[28px] border border-black rounded-full h-[28px] '/>
          <div className='text-[12px] font-light my-auto'><span className='text-sm font-semibold mr-2'> { props.author.username } </span>{ props.description }</div>
          </div>
          {
            user ?(
              user?._id === props?.author?._id &&
              <MdOutlineDelete fontSize={'25px'}  className='my-auto mr-1' onClick={deleteCommentHandler}/>):(<></>)
            }
        </div>
        <div className='ml-10 my-3'>
          <span onClick = {() => setWriteReply(!writeReply)} className='text-sm mr-8'>Reply </span>
          <span onClick = {() => setShowReply(!showReply)} className='text-sm'>Show all replies </span>
          {
            writeReply && 
            <form onSubmit={handleSubmitReply}>
              <div className='flex flex-row gap-5 pb-4 pt-2 px-1'>

                <input type='text' placeholder='Add a reply' value={replyForm} onChange={(e) => setReplyForm(e.target.value)} className='w-full h-9 border border-black rounded-md p-2 focus:ring-0 focus:outline-none  focus:border-black focus:shadow-lg' />
                <button type="submit" onClick={handleSubmitReply}><VscSend fontSize={30} className='my-auto'/></button>
              </div>
            </form>
          }
          {
            showReply && <Reply />
          }
        </div>
    </>
  )
}

export default Comment