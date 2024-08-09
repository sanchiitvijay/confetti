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
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",CREATE_REPLY_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("CREATE_REPLY RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setReplies(response.data.replies))
            toast.success("reply is created succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("CREATE_REPLY_API FAILED....", err)
            toast.error("Could not create reply")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        console.log("CREATE_REPLY_API CHAL GAYA....",)

        return result;
    }
}


export function deleteReply (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE",DELETE_REPLY_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("DELETE_REPLY RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setReplies(response.data.replies))
            toast.success("reply is deleted succesfully")

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
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",GET_ALL_REPLIES_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("GET_ALL_REPLIES RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setReplies(response.data.replies))
            toast.success("replies have been fetched succesfully")
    

        } catch (err) {
            console.log("GET_ALL_REPLIES_API FAILED....", err)
            toast.error("Could not get all reply")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}
