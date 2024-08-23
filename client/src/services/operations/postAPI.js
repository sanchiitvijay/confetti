import { toast } from "react-hot-toast"
import { setLoading, setPost,setTotalPosts} from "../../slices/postSlice"
import { setUserPost,setUserTotalPosts } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { postEndpoints } from "../api"
import { useSelector } from "react-redux"

const {
    CREATE_POST_API,
    EDIT_POST_API,
    DELETE_POST_API,
    GET_POST_API,
    GET_USER_POSTS_API,
    REPORT_POST_API,
    GET_USER_POST_STATS_API
} = postEndpoints

export function getUserPosts(userId,count,token){

    return async(dispatch)=>{
        try{    
            const response=await apiConnector("GET",GET_USER_POSTS_API,null, {
                "Content-Type": "multipart/form-data",
                 Authorization: `Bearer ${token}`,
                 userId:userId,
                 count:count,
            });
            
            if(!response?.data?.success){
               throw new Error(response?.data?.message)
            }
            dispatch(setUserPost(response?.data?.slicedPost))
            dispatch(setUserTotalPosts(response?.data?.totalLength))
        }
        catch(err){
            console.log("GET_POST_BY_USER_API FAILED....", err)
        }
    }
}

export function getUserStats(token){
    return async(dispatch)=>{
        try{
            const response=await apiConnector("GET",GET_USER_POST_STATS_API,null,{
                Authorization: `Bearer ${token}`
            });


            if(!response?.data?.success){
                throw new Error(response?.data?.message)

            }

            return response?.data?.data;
        }
        catch(err){
            console.log("Error in Fetching User Statistics:",err);
        }
    }
}
export function getPosts (count,token) {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET",GET_POST_API,null, {
               "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                count:count,
            })
            
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

    }
}

export function createPost (token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",CREATE_POST_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

        
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setPost(response.data.posts))
            dispatch(setTotalPosts(response.data.postLength))
            toast.success("post is created succesfully")
            
        
        } catch (err) {
            console.log("CREATE_POST_API FAILED....", err)
            toast.error("Could not create post")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

export function editPost (token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",EDIT_POST_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("post is edited succesfully")

        } catch (err) {
            console.log("EDIT_POST_API FAILED....", err)
            toast.error("Could not edit the post")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}

export function deletePost (token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",DELETE_POST_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

        
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setPost(response.data.posts))
            toast.success("post is deleted succesfully")
            

        } catch (err) {
            console.log("DELETE_POST_API FAILED....", err)
            toast.error("Could not delete the post")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}

export function reportPost (token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",REPORT_POST_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            })

        
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setPost(response.data.posts))
            toast.success("post is reported succesfully")
            

        } catch (err) {
            console.log("REPORT_POST_API FAILED....", err)
            toast.error("Could not report the post")

        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }

    }
}