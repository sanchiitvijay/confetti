import React, { useEffect, useState } from 'react'
import logo from "../../assets/confettiNoText.png"
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../services/operations/commentAPI';

const Comment = (props) => {
  const user = useSelector((state) => state.profile.user._id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  // const [deleteComment, setDeleteComment] = useState(false);

  // useEffect(() => {
  //   const deleteCommentHandler = async () => {
  //     dispatch(deleteComment(token, props._id));
  //   }
  //   deleteCommentHandler();
  // }, [deleteComment])

  const deleteCommentHandler = async () => {
    // console.log("props data in comts-------", props)
    dispatch(deleteComment(token, {postId: props.post, commentId: props._id}));
  }
  // console.log("user in comment", user)
  // console.log("cooments mein hai ",)
  return (
    <div className='flex flex-row justify-between py-2'>
          <div className='flex flex-row gap-3'>
          <img src={props.author.displayPicture} alt="" className='w-[28px] border border-black rounded-full h-[28px] '/>
          <div className='text-[10px] my-auto'><span className='text-xs font-semibold mr-2'> { props.author.username } </span>{ props.description }</div>
          </div>
          {
            user === props.author._id &&
            <MdOutlineDelete fontSize={'20px'}  className='my-auto mr-1' onClick={deleteCommentHandler}/>
          }
      </div>
  )
}

export default Comment