import { memo } from "react"
import SubmitButton from "../common/SubmitButton"

export default memo(function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg bg-[#fffcec] dark:bg-confettiDarkColor3 border border-black dark:border-white  p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 ">
          {modalData?.text2}
        </p>
        <div className="flex mx-5 justify-between gap-x-4">
          <SubmitButton
          customClasses="text-black rounded-md font-semibold "
            type="submit"
            onclick={modalData?.btn1Handler}
            disabled={false}
            text={modalData?.btn1Text}

          />
          <button
            className="cursor-pointer rounded-md  py-[8px] px-[20px] font-semibold "
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
})