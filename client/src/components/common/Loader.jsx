import React from 'react'
import { Hearts } from 'react-loader-spinner'


const Loader = () => {
  return (
    <div className='w-full h-full '>
        <Hearts
            height="80"
            width="80"
            color="#DC143C"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            className="mx-auto my-auto"
        />
    </div>
  )
}

export default Loader