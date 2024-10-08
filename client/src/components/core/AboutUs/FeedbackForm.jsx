import React, { useState } from 'react'
import SubmitButton from '../../common/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { sendFeedback } from '../../../services/operations/userAPI'


const FeedbackForm = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const [feedback, setFeedback] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(sendFeedback(token, {message:feedback}))
  }


  return (
    <form className="p-2 w-[90%] md:w-[80%] lg:w-[60%]">
        <div className="my-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md">

        <div className="flex flex-col gap-y-6 rounded-md md:p-8 p-4 bg-white dark:bg-confettiDarkColor3">
          <h2 className="text-lg mb-2 font-semibold text-center text-richblack-5">
            Feedback
          </h2>
            <div className="flex flex-col mx-auto gap-2 w-full">
              
              <textarea
                type="text"
                value={feedback}
                onChange = {(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full text-[16px] text-center mx-auto leading-[24px] font-[500] dark:text-[#999DAA] rounded-[0.5rem] dark:bg-[#2C333F] p-[12px]"
                />
            </div>
        </div>
        </div>

        <div className="flex justify-end gap-2">
          <SubmitButton
          type="submit" text="Submit" onclick={handleSubmit}/>
        </div>
      </form>
  )
}

export default FeedbackForm