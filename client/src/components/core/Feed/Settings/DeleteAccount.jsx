import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeUser } from "../../../../services/operations/userAPI"



export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const {user}=useSelector((state)=>state.profile);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log("TOKEN THIS ONE:",token)
  async function handleDeleteAccount() {
    try {
      
      
      const formData=new FormData();
      formData.append("userId",user?._id);
      dispatch(removeUser(formData,token,navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="mt-10 mx-4 flex flex-col sm:flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain a lot of confessions. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}