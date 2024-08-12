import React from 'react'
import Post from '../components/core/Feed/Post/Post'
import {Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Page404 from './Page404'
import { setRedirection } from '../slices/authSlice'

const PostPage = () => {
  const dispatch = useDispatch()
  const postid = useParams().postid.substring(1)
  console.log("postid", postid)
  const {post} = useSelector((state) => state.post);
  const token = useSelector((state) => state.auth.token);  
  console.log("post", post)
  if(!token){
    
    dispatch(setRedirection(`/feed/${postid}`))
    return <Navigate to="/login"/>
  }

  const selectedPostArr = post.filter((p) => p?._id === postid);
  let selectedPost = selectedPostArr[0]

  const newseletedpost = {...selectedPost}
  newseletedpost.showAllComment = true

  console.log("newseletedpost", newseletedpost)

  if(selectedPost.length == 0) {
    return<Navigate to="/qwerty"/>
  }

  else {  
      return (
        <div className='w-full h-max grid overflow-auto over'>
          <Post {...newseletedpost}/>
      </div>
    )
  }
}

export default PostPage