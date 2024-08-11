import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import  "../../../../App.css";
import SubmitButton from "../../../common/SubmitButton"
import { editUser } from "../../../../services/operations/userAPI";
import { setUser } from "../../../../slices/profileSlice";
import "./Settings.css"

const genders = ["Male", "Female","Other"]
const years=["First","Second","Third","Fourth"]
export default function EditProfile () {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
     const newUser=dispatch(editUser(data,token));
     
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)} className="p-2">
        {/* Profile Information */}
        <div className="my-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate gradient-box p-1 rounded-md">

        <div className="flex flex-col gap-y-6 rounded-md p-8 bg-white dark:bg-confettiDarkColor3">
          <h2 className="text-lg mb-2 font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5  lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="name" className="text-[14px] leading-[22px] font-[400] dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full  text-[16px] leading-[24px] font-[500] dark:text-[#999DAA] rounded-[0.5rem] dark:bg-[#2C333F] p-[12px] pr-12 "
                {...register("name", { required: true })}
                defaultValue={user?.name}
                />
              {errors.name && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="username" className="text-[14px] leading-[22px] font-[400] dark:text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full  rounded-[0.5rem] dark:bg-[#2C333F] p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
                {...register("username", { required: true })}
                defaultValue={user?.username}
                />
              {errors.username && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your username
                </span>
              )}
            </div>
          </div>

          <div className="flex relative flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="instagram" className="text-[14px] leading-[22px] font-[400] dark:text-white">
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                id="instagram"
                placeholder="Enter your insta handle"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] dark:bg-[#2C333F] p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
                {...register("instagram", { required: true })}
                defaultValue={user?.instagram}
                />
              {errors.instagram && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your insta handle carefully.
                </span>
              )}
            </div>
           
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="year" className="text-[14px] leading-[22px] font-[400] dark:text-white">
                Year
              </label>
              <select
                type="text"
                name="year"
                id="year"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] dark:bg-[#2C333F] p-[12px] pr-12 text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"
                {...register("year", { required: true })}
                defaultValue={user?.year}
                >
                {years.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.year && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select your year of study
                </span>
              )}
            </div>

          </div>

         
        </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/feed/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <SubmitButton            
           type="submit" text="Save" />
        </div>
      </form>
      {/* <div class="wrapper">
        <h2>Change on hover</h2>
        <div class="section">
            <div class="card-snake draw">
            <div class="inner">Hover over me</div>
            <div class="tail top"></div>
            <div class="tail right"></div>
            <div class="tail bottom"></div>
            <div class="tail left"></div>
          </div>
        </div>
      </div> */}
    </>
  )
}