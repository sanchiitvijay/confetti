import { toast } from "react-hot-toast";
import { setLoading, setComments } from "../../slices/commentSlice";
import { apiConnector } from "../apiConnector";
import { commentEndpoints } from "../api";
import { setPost } from "../../slices/postSlice";

const {
    CREATE_COMMENT_API,
    GET_ALL_COMMENTS_API,
    GET_USER_COMMENTS_API,
    DELETE_COMMENT_API,
} = commentEndpoints;

export function createComments(token, data) {
    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CREATE_COMMENT_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const result = response.data.comments;

            // Access the Redux state
            const state = getState();
            const post = state.post.post;

            const postToUpdate = post.find((p) => p._id === result[0].post);
            const otherPosts = post.filter((p) => p._id !== result[0].post);

            const updatedPost = {
                ...postToUpdate,
                comments: [...postToUpdate.comments, Date.now()] // Add actual comment data
            };
            const newPostArray = [updatedPost, ...otherPosts];

           

            dispatch(setPost(newPostArray));
            dispatch(setComments(result));

            return result;

        } catch (err) {
            console.log("CREATE_COMMENT_API FAILED...", err);
            toast.error("Could not create comment");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function getAllComments(token, postId) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_ALL_COMMENTS_API, null, {
                "Content-Type": "application/json", // Fixed typo
                Authorization: `Bearer ${token}`,
                postId: postId,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setComments(response.data.comments));

            return response.data.comments

        } catch (err) {
            console.log("GET_ALL_COMMENTS_API FAILED...", err);
            toast.error("Some error occurred while fetching the comments");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function getUserComments(token, data) {
    return async (dispatch) => {
        let result = null;
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_USER_COMMENTS_API, data, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setComments(response.data.data));
            result = response.data.data;

        } catch (err) {
            console.log("GET_USER_COMMENTS_API FAILED...", err);
            toast.error("Could not get user comments");
        } finally {
            dispatch(setLoading(false));
        }

        return result;
    };
}

export function deleteComment(token, data) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", DELETE_COMMENT_API, data, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setComments(response.data.comments));
            return response.data.comments;

        } catch (err) {
            console.log("DELETE_COMMENT_API FAILED...", err);
            toast.error("Could not delete the comment");
        } finally {
            dispatch(setLoading(false));
        }
    };
}
