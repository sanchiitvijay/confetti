import { toast } from "react-hot-toast"
import { setLoading, setPost,setTotalPosts} from "../../slices/postSlice"
import { apiConnector } from "../apiConnector"
import { postEndpoints } from "../api"

const {
    CREATE_POST_API,
    EDIT_POST_API,
    DELETE_POST_API,
    GET_POST_API,
    GET_USER_POST_API,
    REPORT_POST_API
} = postEndpoints

export function getPosts (count,token) {
    return async(dispatch) => {
        let result = null
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET",GET_POST_API,null, {
               "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                count:count,
            })
            console.log("GET_POST RESPONSE....", response)
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            

            dispatch(setPost(response.data.slicedPost))
            dispatch(setTotalPosts(response.data.totalLength))
            
          
         

        } catch (err) {
            console.log("GET_POST_API FAILED....", err)
            toast.error("Could not get all posts")

        } finally {
            
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function createPost (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",CREATE_POST_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("CREATE_POST RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setPost(response.data.posts))
            dispatch(setTotalPosts(response.data.postLength))
            toast.success("post is created succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("CREATE_POST_API FAILED....", err)
            toast.error("Could not create post")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function editPost (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",EDIT_POST_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("EDIT_POST RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setPost({...response.data.data}))
            toast.success("post is created succesfully")
            result = response?.data?.data

        } catch (err) {
            console.log("EDIT_POST_API FAILED....", err)
            toast.error("Could not edit the post")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function deletePost (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE",DELETE_POST_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("DELETE_POST RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setPost({...response.data.data}))
            toast.success("post is deleted succesfully")
            result = response?.data?.data
            

        } catch (err) {
            console.log("DELETE_POST_API FAILED....", err)
            toast.error("Could not delete the post")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}

export function reportPost (token, data) {
    return async(dispatch) => {
        let result = null
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",REPORT_POST_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            console.log("REPORT_POST RESPONSE....", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setPost({...response.data.data}))
            toast.success("post is reported succesfully")
            result = response?.data?.data
            

        } catch (err) {
            console.log("REPORT_POST_API FAILED....", err)
            toast.error("Could not report the post")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

        return result;
    }
}