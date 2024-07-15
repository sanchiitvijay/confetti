import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import SignUpInput from '../components/common/SignUpInput';
import PasswordInput from '../components/common/PasswordInput';
import DropdownMenu from '../components/common/DropdownMenu';
import { RxAvatar } from "react-icons/rx";
import SubmitButton from '../components/common/SubmitButton';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"
import { sendOtp } from '../services/operations/authAPI'
import { setSignupData } from '../slices/authSlice';
import DropDownModal from '../components/common/DropDownModal';
import Modal from '../components/common/Modal';

const Signup = () => {
  const {token}=useSelector((state)=>state.auth)
  const {signupData}=useSelector((state)=>state.auth); 
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [loading,setLoading] = useState(false)
  const [genderModal,setGenderModal]=useState(false);
  const [yearModal,setYearModal]=useState(false);
  const [branchModal,setBranchModal]=useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(!isChecked);
  };



  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: {errors, isSubmitSuccessful}
  } = useForm()

  const handleSignup = async(data) => {
    setLoading(true);
    try{
      const obj={
        ...getValues(),
      avatar: avatar.file
      }
      
      dispatch(setSignupData(obj))
  
      // dispatch(setSignupData(obj))
      dispatch(sendOtp(obj?.email,navigate));

    }
    catch(error){
      console.log("Error:",error.message);
      console.log("Error object:",error);
    
    }
    setLoading(false)
}


 
useEffect(()=>{
  
  if(isSubmitSuccessful){
    reset({
      email:"",
      name:"",
      usn:"",
      password:"",
      confirmPassword:"",
      branch:"",
      year:"",
      avatar:setAvatar({
        file: null,
        url: ""
      }),
      gender:""
    })
  }
},[isSubmitSuccessful, reset]);

 const gender = ["Male", "Female", "Other"]
  const year = ["First", "Second", "Third", "Fourth"]
  const branches = ['CS','IS','AD','AI','AT','BT','CH','CI','CY','EC','EE','EI','IM','BA','MC','MD','ME','CV']
  const [avatar, setAvatar] = useState({
    file: null,
    url:""
})

const handleAvatar = async (e) => {

  if(e.target.files[0]){
    const fileUrl=URL.createObjectURL(e.target.files[0]);
    console.log(fileUrl.split("blob:")[1]);
    setAvatar(
      {
        file:e.target.files[0],
        url:fileUrl
      })
  }
}

useEffect(()=>{     
  if(token){
    navigate("/feed")
  }
},[token,navigate])



useEffect(()=>{
  setValue("avatar",avatar?.file)
},[avatar])

  
  return (

    <div className='w-full relative h-full mx-auto text-cFont'>

      <div className='min-h-screen relative p-8  item-center justify-between w-full'>

        <div className='py-12 px-12 xs:w-[100%] md:w-fit bg-gray-400 rounded-md bg-clip-padding backdrop-filter mx-auto justify-center backdrop-blur-md bg-opacity-20 border border-gray-400'>

          <h2 className='text-white text-4xl font-semibold text-center'>
            Sign Up
          </h2>

          <form className='mt-8 flex w-full flex-col gap-y-8' onSubmit={handleSubmit(handleSignup)}>
          {/* having 2 input fieldl in one row */}
          <div className='flex flex-col-reverse md:flex-row gap-10'>
          <div className='flex flex-col gap-y-8'>
             <SignUpInput 
             name="name" 
             value="name"
             type="text"
             error={errors?.name}
             required={true}
             register={register}/>
            <SignUpInput 
            name="email" 
            value="email"
            type="email"
            error={errors?.email}
            required={true}
            register={register}/>
          </div>
            <div className='flex flex-row mx-auto'>
              
            <label className="text-white hover:underline hover:cursor-pointer" htmlFor="file" >
            {avatar.url ? (
              <img src={avatar.url}    className="rounded-full w-[100px] h-[100px]" alt="Avatar" />
            ) : (
              <RxAvatar  fontSize={100} color='ffffff'/>
            )}<span className='text-center mx-auto'>
            Upload avatar
            </span>
                </label>
            </div>
                <input type="file" id="file" style={{display: "none"}} {...register("avatar")}  onChange={handleAvatar}/>
            
          </div>
          <div className='flex flex-col md:flex-row gap-10'>

            <SignUpInput 
            name="username" 
            value="username" 
            required={true}
            type="text"
            error={errors?.username}
            register={register}
            />

            <SignUpInput 
            name="USN" 
            value="usn" 
            type="text"
            required={true}
            error={errors?.usn}
            register={register}/>
          </div>
          
          <div className='flex flex-col md:flex-row gap-10'>

         <PasswordInput
          name="password" 
          value="password" 
          type="password"
          required={true}
          error={errors?.password}
          register={register}
          
          />

         <PasswordInput 
         name="Confirm password" 
         value="confirmPassword" 
         type="password"
         error={errors?.confirmPassword}
          required={true}
         register={register}/>
            
          </div>

          <div className='flex flex-col  md:flex-row gap-10'>
            <DropDownModal
            setModal={setGenderModal}
            name={"Gender"}
            showModal={genderModal}
            />
            <DropDownModal 
              setModal={setBranchModal}
              name={"Branch"}
              showModal={branchModal}
          
            />
          </div>

          <div className='flex flex-col md:flex-row gap-10'>
            <DropDownModal 
              setModal={setYearModal}
              name={"Year"}
              showModal={yearModal}
            />
            <SignUpInput 
            name="Instagram" 
            value="instagram" 
            type="text" 
            error={errors?.instagram}
            register={register}
            required={false}/>
          </div>

            <div className='text-white'>
            <input id="termsAndConditions" 
            type="checkbox" 
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-4 h-4 mr-3 focus:ring-transparent text-white bg-transparent border-white rounded " />
              Accept our
              <span 
              onClick={()=>navigate("/terms-and-conditions")} 
              className='hover:underline hover:cursor-pointer mx-2'>
              terms and conditions 
              </span>
              to proceed further. 
            </div>
          <SubmitButton
                  disabled={!isChecked || loading}
                  text="Sign Up"
                  type="submit"
                  
            />


            <div className='text-white text-center'>
              Already Have An Account, <span onClick={()=>navigate("/")} className='hover:underline hover:cursor-pointer'>Log In Here</span>
            </div>
          </form>

        </div>
           {genderModal && <Modal
      data={gender} 
      name="Gender" 
      value="gender"
      error={errors?.gender} 
      register={register}
      required={false}
      setModal={setGenderModal} 
      />}

      {
        branchModal && <Modal
        data={branches} 
        name="Branch" 
        value="branch" 
        setModal={setBranchModal} 
        error={errors?.branch}
        required={false}
        register={register}
      
        />
      }
     
     {
      yearModal && <Modal
      data={year} 
      name="Year" 
      value="year"
      setModal={setYearModal} 
      error={errors?.year}
      register={register}
      required={true}
      />
     }
      </div>
 
   
      
    </div>
 
  )
}

export default Signup