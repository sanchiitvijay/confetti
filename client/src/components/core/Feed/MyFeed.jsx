import React from 'react'
import CreatePost from '../../common/CreatePost'
import Post from './Post'

const MyFeed = () => {
  let data=[];
  for(let i=0;i<20;i++){
    data.push(i);
  }
  return (
    <div className='w-full grid place-items-center overflow-auto' >
        <CreatePost/>
        {
            data.map((post)=>(
                <Post/>
            ))
        }
    </div>
  )
}

export default MyFeed