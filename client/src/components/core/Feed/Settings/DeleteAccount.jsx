import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeUser } from "../../../../services/operations/userAPI"
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useState } from "react";


export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const {user}=useSelector((state)=>state.profile);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal,setConfirmationModal]=useState(null);
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
      <div className="mt-10 mx-4 flex flex-col sm:flex-row gap-x-5 rounded-md border-[1px]  border-pink-700 bg-pink-300 dark:bg-pink-900 p-8 px-12">
        <div className="flex flex-row sm:flex-col gap-4">

        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-500 dark:bg-pink-700">
        
          <FiTrash2 className="text-3xl text-pink-950 cursor-pointer dark:text-pink-200" 
          onClick={()=>setConfirmationModal({
            text1:"Are You Sure?",
            text2:"Your account will be deleted permanently.",
            btn1Text:"Delete",
            btn2Text:"Cancel",
            btn1Handler:()=>handleDeleteAccount(),
            btn2Handler: ()=>setConfirmationModal(null),
          })}
        />
          
        </div>
          <div className="md:hidden my-auto  dark:text-pink-400 text-pink-900 text-lg font-semibold ">
            Delete account
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="max-md:hidden text-lg dark:text-pink-200 text-pink-900 font-semibold ">
            Delete Account
          </h2>
          <div className="lg:w-3/5 text-pink-800 dark:text-pink-50">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain a lot of confessions. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-900 hover:underline dark:text-pink-300"
            onClick={()=>setConfirmationModal({
              text1:"Are You Sure?",
              text2:"Your account will be deleted permanently.",
              btn1Text:"Delete",
              btn2Text:"Cancel",
              btn1Handler:()=>handleDeleteAccount(),
              btn2Handler: ()=>setConfirmationModal(null),
            })}
          >
            I want to delete my account.
          </button>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
      </div>
    </>
  )
}