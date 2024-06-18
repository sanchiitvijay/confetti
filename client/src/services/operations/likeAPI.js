import { toast } from "react-hot-toast"

import { setLoading, setLikes } from "../../slices/likeSlice"
import { apiConnector } from "..apiconnector"
import { likeEndpoints } from "../apis"

const {
    LIKED_API,
    GET_ALL_LIKES_API,
  } = likeEndpoints;

  export function liked (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET",GET_ALL_LIKES_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("GET_ALL_LIKES RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setLikes(response.data.data))
            toast.success("likes has been fetched succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("GET_ALL_LIKES_API FAILED....", err)
            toast.error("Could not get all likes")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function liked (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",LIKED_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("LIKED RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setLikes({...response.data.data}))
            toast.success("like is set succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("LIKED_API FAILED....", err)
            toast.error("Could not set the like")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}