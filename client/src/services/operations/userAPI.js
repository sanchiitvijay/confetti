import { toast } from "react-hot-toast"
import { setUser, setLoading, setTopLikes, setTopPost } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { userEndpoints } from "../api"
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
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
                Authorization: `Bearer ${token}`
            })

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setUser({...response.data.data}))

        } catch (err) {
            dispatch(logout(navigate))
            console.log("GET_ALL_USERS_API FAILED....", err)
            toast.error("Could not get all users")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}

export function removeUser(data, token,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("DELETE", DELETE_USER_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))

        
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setToken(null))
            dispatch(setUser(null))
            navigate("/");
            toast.success("User is removed succesfully")
         
        } catch (err) {

            console.log("REMOVE USER API FAILED....", err)
            toast.error("Could not delete the user")
        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}

export function editUser(data, token) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("POST", EDIT_USER_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))


            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setUser(response?.data?.updatedUser))

        } catch (err) {
            console.log("EDIT USER API FAILED....", err)
            toast.error("Could not edit the user")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

export function deleteGraduates(token) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("delete", DELETE_GRADUATES_API, null, {
                Authorization: `Bearer ${token}`,
            }))

            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Graduates deleted succesfully")
            
        } catch (err) {
            console.log("DELETE GRADUATES API FAILED....", err)
            toast.error("Could not delete the graduates")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}

export function promoteStudents(data, token) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await (apiConnector("POST", PROMOTE_STUDENTS_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Students are promoted succesfully")

        } catch (err) {
            console.log("PROMOTE STUDENTS API FAILED....", err)
            toast.error("Could not promote the students")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}


export function changePassword(data, token) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try{
            const response = await (apiConnector("POST", CHANGEPASSWORD_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }))

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
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            
            dispatch(setUser(response?.data?.data))

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


            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Thank you for your feedback! ☺")

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


            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Feedback fetched successfully")
            result = response?.data?.feedbacks

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