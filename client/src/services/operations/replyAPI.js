import { toast } from "react-hot-toast"
import { setLoading, setReplies } from "../../slices/replySlice"
import { apiConnector } from "../apiConnector"
import { replyEndpoints } from "../api"

const {
    CREATE_REPLY_API,
    DELETE_REPLY_API,
    GET_ALL_REPLIES_API,
} = replyEndpoints



export function createReply (token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",CREATE_REPLY_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

        
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setReplies(response.data.replies))
        
        } catch (err) {
            console.log("CREATE_REPLY_API FAILED....", err)
            toast.error("Could not create reply")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}


export function deleteReply (token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",DELETE_REPLY_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setReplies(response.data.replies))
        
        } catch (err) {
            console.log("DELETE_REPLY_API FAILED....", err)
            toast.error("Could not delete the reply")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

export function getAllReplies (token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",GET_ALL_REPLIES_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

        
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setReplies(response.data.replies))
        

        } catch (err) {
            console.log("GET_ALL_REPLIES_API FAILED....", err)
            toast.error("Could not get all reply")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}
