import React,{useEffect,useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from './Post/Post'
import { getUserPosts } from '../../../services/operations/postAPI';
import { useDispatch, useSelector } from 'react-redux';
import PostSkeleton from './Post/PostSkeleton';
import useThrottle from '../../../hooks/useThrottle';

const MyPosts = () => {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.profile)
  const { token } = useSelector((state) => state.auth);
  const { userPost, userTotalPosts } = useSelector((state) => state.profile);
  const [count, setCount] = useState(4);
  const fetchMoreData = async () => {
    try {
      await dispatch(getUserPosts(user?.id,count + 4, token));
      setCount(count + 4);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserPosts(user?.id,count, token));
        console.log("POST DATA:", userPost);
        console.log("TOTAL NUMBER OF POSTS:", userTotalPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full  overflow-auto over" id="scrollableDiv">
    <InfiniteScroll
      dataLength={userPost.length}
      next={fetchMoreData}
      hasMore={userPost.length===userTotalPosts?(false):(true)}
      loader={<PostSkeleton/>}
      endMessage={
        <p className='mb-8 dark:text-white text-black text-center'>
          <b>Yay! You have seen it all 😉</b>
        </p>
      }
      scrollableTarget="scrollableDiv"
    >
      {userPost?.map((p) => (
        <Post key={p.id} {...p} />
      ))}
    </InfiniteScroll> 
  </div>
  )
}

export default MyPosts