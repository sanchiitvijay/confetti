import React, { useEffect, useState } from 'react';
import CreatePost from './Post/CreatePost';
import Post from './Post/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPosts } from '../../../services/operations/postAPI';
import { useDispatch, useSelector } from 'react-redux';
import PostSkeleton from './Post/PostSkeleton';

const MyFeed = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { post, totalPosts } = useSelector((state) => state.post);
  const [count, setCount] = useState(4);

  const fetchMoreData = async () => {
    try {
      dispatch(getPosts(count + 4, token));
      setCount(count + 4);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getPosts(count, token));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full grid overflow-auto over" id="scrollableDiv">
      <CreatePost />
      <InfiniteScroll
        dataLength={post.length}
        next={fetchMoreData}
        hasMore={post.length===totalPosts?(false):(true)}
        loader={<PostSkeleton/>}
        endMessage={
          <p className='mb-8 dark:text-white text-black text-center'>
            <b>Yay! You have seen it all 😉</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {post?.map((p) => (
          <div key={p?.id}>

          <Post {...p} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MyFeed;
