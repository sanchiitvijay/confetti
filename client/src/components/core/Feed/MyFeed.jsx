import React from 'react'
import CreatePost from '../../common/CreatePost'
import Post from './Post'
import InfiniteScroll from 'react-infinite-scroll-component';

const MyFeed = () => {
  let data=[];
  for(let i=0;i<20;i++){
    data.push(i);
  }
  const fetchData=()=>{
    
  }
  return (
    <div className='w-full grid place-items-center overflow-auto' >
        <CreatePost/>
        <InfiniteScroll
  dataLength={data.length} //This is important field to render the next data
  next={fetchData}
  hasMore={true}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }

>
{
            data.map((post)=>(
                <Post/>
            ))
        }
</InfiniteScroll>
       
    </div>
  )
}

export default MyFeed