import React, { useEffect, useState } from 'react';
import Post from '../components/core/Feed/Post/Post';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirection } from '../slices/authSlice';
import { postExist } from '../services/operations/postAPI';

const PostPage = () => {
  const dispatch = useDispatch();
  const { postid } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [selectedPost, setSelectedPost] = useState(null);
  
  useEffect(() => {
    if (!token) {
      dispatch(setRedirection(`/feed/${postid}`));
      return;
    }

    const fetchPost = async () => {
      const response = await dispatch(postExist(token, postid));
      setSelectedPost(response);
    };

    fetchPost();
  }, [dispatch, postid, token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (selectedPost === false) {
    return <Navigate to="/page404" />;
  }

  if (selectedPost === null) {
    return <div>Loading...</div>;
  }

  const newSelectedPost = { ...selectedPost, showAllComment: true };

  return (
    <div className='w-full h-max grid overflow-auto'>
      <Post {...newSelectedPost} />
    </div>
  );
};

export default PostPage;
