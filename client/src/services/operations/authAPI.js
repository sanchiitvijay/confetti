import { toast } from "react-hot-toast"

import { setLoading, setRedirection, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { authEndpoints } from "../api"
import { useSelector } from "react-redux"
import { setDevice } from "../../slices/notificationSlice"
import {auth} from "../../firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth"

const {
    LOGIN_API,
    SENDOTP_API,
    SIGNUP_API,
    RESETPASSWORD_API,
    RESETPASSTOKEN_API
  } = authEndpoints;


  export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {

        

        const response = await apiConnector("POST", SENDOTP_API, {
          email
        })
        
        
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/otp")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


  export function signUp(
    accountType,
    name,
    username,
    usn,
    email,
    password,
    confirmPassword,
    gender,
    branch,
    year,
    instagram,
    avatar,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true));
   
      try {
        const formData=new FormData();
        formData.append('accountType',accountType);
        formData.append('name',name);
        formData.append('username',username);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('confirmPassword',confirmPassword);
        formData.append('gender',gender);
        formData.append('branch',branch);
        formData.append('year',year);
        formData.append('instagram',instagram);
        formData.append('avatar',avatar);
        formData.append('otp',otp);
        formData.append('usn',usn)


        const response = await apiConnector("POST", SIGNUP_API, formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
       
        
        
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

       
        toast.success("Signup Successful")
        navigate("/")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user));
        

        console.log("Log in krne jaa rhe h firebase me")
        const loggedUser=await signInWithEmailAndPassword(auth,email,password);
        console.log("Logged user to firebase",loggedUser);
        if(!loggedUser){
          throw new Error("Firebase ki fatgyi");
        }
        navigate("/feed")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


  export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {
          password,
          confirmPassword,
          token,
        })
  
        
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        toast.success("Password Reset Successfully")
        navigate("/")
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error("Failed To Reset Password")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }


  
export function logout(navigate) {
    return async(dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(setDevice(null))
      localStorage.clear();
      sessionStorage.clear();
      console.log("firebase se pehle")
      await signOut(auth);
      console.log("firebase se out hone ke baad")
      toast.success("Logged Out")
      navigate("/")
    }
  }
  


export function getPasswordResetToken(email,setEmailSent){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
      const response=await apiConnector("POST",RESETPASSTOKEN_API,{
        email
      });
      
      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error){
      console.log("Reset password token error",error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}


