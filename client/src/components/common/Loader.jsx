import React from 'react'
import { Hearts } from 'react-loader-spinner'


const Loader = () => {
  return (
    <div className='w-full h-full grid place-items-center'>
        <Hearts
            height="80"
            width="80"
            color="#DC143C"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  )
}

export default Loader