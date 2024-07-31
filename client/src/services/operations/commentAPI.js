import { toast } from "react-hot-toast"

import { setLoading, setComments } from "../../slices/commentSlice"
import { apiConnector } from "../apiConnector"
import { commentEndpoints } from "../api";

const {
    CREATE_COMMENT_API,
    GET_ALL_COMMENTS_API,
    GET_USER_COMMENTS_API,
    DELETE_COMMENT_API,
  } = commentEndpoints;

export function createComments (token, data) {
    return async (dispatch) => {
        let result = null;
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", CREATE_COMMENT_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("CREATE_COMMENT RESPONSE....", response);

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setComments({...response.data.data}))
            toast.success("comment is created successfully")
            result = response?.data?.data
        } catch (err) {
            console.log("CREATE_COMMENTS_API FAILED...", err);
            toast.error("Could not create comment")
        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}


export function getAllComments (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET",GET_ALL_COMMENTS_API, data, {
                Authorization: `Bearer ${token}`
            })

            console.log("GET_ALL_COMMENTS RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setComments(response.data.data))
            toast.success("comments has been fetched succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("GET_ALL_COMMENTS_API FAILED....", err)
            toast.error("Could not get all comments")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function getUserComments (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET",GET_USER_COMMENTS_API, data, {
                Authorization: `Bearer ${token}`
            })

            console.log("GET_USER_COMMENTS RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setComments(response.data.data))
            toast.success("user comments has been fetched succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("GET_USER_COMMENTS_API FAILED....", err)
            toast.error("Could not get user comments")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}


export function deleteComment (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE",DELETE_COMMENT_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("REMOVE_COMMENT RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setComments({...response.data.data}))
            toast.success("comment has been deleted succesfully")
            result = response?.data?.data
            

        } catch (err) {
            console.log("REMOVE_COMMENTS_API FAILED....", err)
            toast.error("Could not delete the comment")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}
