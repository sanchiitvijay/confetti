import { toast } from "react-hot-toast"

import { setUser, setLoading } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { authEndpoints, userEndpoints } from "../api"
import { logout } from "./authAPI"
import { setToken } from "../../slices/authSlice"

const {
    GET_ALL_USERS_API,
    EDIT_USER_API,
    DELETE_USER_API,
    DELETE_GRADUATES_API,
    PROMOTE_STUDENTS_API,
    CHANGEPASSWORD_API,
    UPDATE_DP_API,
    SEND_FEEDBACK_API,
    GET_FEEDBACK_API,
} = userEndpoints;





export function getAllUsers (token, navigate) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
                Authorization: `Bearer ${token}`
            })

            console.log("GET_USERS RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setUser({...response.data.data}))
            toast.success("user is fetched succesfully")
            result = response?.data?.data

        } catch (err) {
            dispatch(logout(navigate))
            console.log("GET_ALL_USERS_API FAILED....", err)
            toast.error("Could not get all users")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function removeUser(data, token,navigate) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("DELETE", DELETE_USER_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))

            console.log("REMOVED USER....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setToken(null))
            dispatch(setUser(null))
            navigate("/");
            toast.success("User is removed succesfully")
            result = response?.data?.data
         
        } catch (err) {

            console.log("REMOVE USER API FAILED....", err)
            toast.error("Could not delete the user")
        } finally {
            
            toast.dismiss(toastId)
           
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function editUser(data, token) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("POST", EDIT_USER_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))

            console.log("EDITED USER....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("User is edited succesfully")
            result = response?.data?.updatedUser
            console.log("RESULT YE THA ISKA:",result)
            dispatch(setUser(result))

        } catch (err) {
            console.log("EDIT USER API FAILED....", err)
            toast.error("Could not edit the user")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function deleteGraduates(token) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("delete", DELETE_GRADUATES_API, null, {
                Authorization: `Bearer ${token}`,
            }))

            console.log("DELETED GRADUATES....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Graduates deleted succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("DELETE GRADUATES API FAILED....", err)
            toast.error("Could not delete the graduates")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result
    }
}

export function promoteStudents(data, token) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("POST", PROMOTE_STUDENTS_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))

            console.log("PROMOTED STUDENTS....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Students are promoted succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("PROMOTE STUDENTS API FAILED....", err)
            toast.error("Could not promote the students")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
        
        return result;
    }
}


export function changePassword(data, token) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try{
            console.log("API WALI TOKEN:",token)
            const response = await (apiConnector("POST", CHANGEPASSWORD_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))

            console.log("Password Change response...", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password updated successfully")

        } catch (err) {
            console.log("CHANGE PASSWORD API FAILED....", err)
            toast.error("Could not change the password")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

export function updateDisplayPicture(token,data){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try{
           
            const response = await (apiConnector("POST", UPDATE_DP_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))

            console.log("Updated data after dp change...", response)
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            
            dispatch(setUser(response?.data?.data))
            toast.success("Dp updated successfully")

        } catch (err) {
            console.log("DP FAILED..", err)
            toast.error("Display Picture couldnt be updated")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    } 
}

export function sendFeedback(token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try{
            const response = await (apiConnector("POST", SEND_FEEDBACK_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }))

            console.log("Feedback response...", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Feedback sent successfully")

        } catch (err) {
            console.log("SEND FEEDBACK API FAILED....", err)
            toast.error("Could not send the feedback")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

export function getFeedback(token) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("GET", GET_FEEDBACK_API, null, {
                Authorization: `Bearer ${token}`,
            }))

            console.log("Feedback response...", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Feedback fetched successfully")
            result = response?.data?.data

        } catch (err) {
            console.log("GET FEEDBACK API FAILED....", err)
            toast.error("Could not get the feedback")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}