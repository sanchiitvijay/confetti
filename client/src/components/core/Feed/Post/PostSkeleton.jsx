import { VscGripper } from "react-icons/vsc";
import { IoShareSocialOutline, IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

const PostSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
       <div className='border dark:text-white mx-auto md:w-[500px] w-[95%] bg-confettiLightColor2 dark:bg-confettiDarkColor3 border-black dark:border-white rounded-md my-3 md:my-12 p-3 md:p-4 pb-3'>
        <div className='flex flex-row border-b border-black dark:border-white pb-3 justify-between'>
            <div className='flex flex-row gap-3'>
            <div className='w-[40px] h-[40px] object-fill rounded-full border border-confettiDarkColor1 dark:border-confettiLightColor1'>
            </div>
            <div className='flex flex-col'>
                <h1 className='font-semibold text-sm'>Anonymous</h1>
                <p className='text-xs'>Time</p>
            </div>
            </div>
            <VscGripper className='my-auto' fontSize={'30px'}/>
        </div>

        {/* content */}
        <div className='p-3 md:p-4 min-h-[200px] opacity-75 text-center text-lg md:text-xl content-center border-black dark:border-white border-b'>
            Please Wait for a while <br/>
            fetching more posts
        </div>

        {/* footer */}
        <div className='flex pt-2 justify-between px-5 flex-row'>
            <div className='flex gap-3 content-center flex-row'>
                <IoMdHeartEmpty fontSize={'23px'}/>
                <IoChatbubbleOutline fontSize={'20px'} />
                <IoShareSocialOutline fontSize={'18px'} />
            </div>
            <div className='content-center text-xs'>Date</div>
        </div>
      </div>
    </div>
  )
}

export default PostSkeleton