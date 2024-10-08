import { toast } from "react-hot-toast"

import { setLoading, setLikes } from "../../slices/likeSlice"
import { apiConnector } from "../apiConnector"
import { likeEndpoints } from "../api"
import { setTotalLikes } from "../../slices/postSlice";

const {
    LIKED_API,
    GET_ALL_LIKES_API,
  } = likeEndpoints;


//   havent used it yet
  export function getAllLikes (token, data) {
    return async(dispatch) => {
        
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET",GET_ALL_LIKES_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })


            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setLikes(response.data.data))

        } catch (err) {
            console.log("GET_ALL_LIKES_API FAILED....", err)
            toast.error("Could not get all likes")

        } finally {
            dispatch(setLoading(false))
        }

    }
}

export function liked (token, data) {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",LIKED_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })


            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            // dispatch(setTotalLikes(response.data.like))

        } catch (err) {
            console.log("LIKED_API FAILED....", err)
            toast.error("Could not set the like")

        } finally {
            dispatch(setLoading(false))
        }

    }
}