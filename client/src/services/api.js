const BASE_URL = "http://localhost:4000/api/v1"


export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SENDOTP_API: BASE_URL + "/auth/send-otp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword"
}

export const userEndpoints = {
    GET_ALL_USERS_API: BASE_URL + "/auth/get-all-user",
    REMOVE_USER_API: BASE_URL + "/auth/remove-user",
    EDIT_USER_API: BASE_URL + "/auth/edit-user",
    CHANGEPASSWORD_API: BASE_URL + "/auth/change-password",
    DELETE_USER_API: BASE_URL + "/auth/remove-user",
    DELETE_GRADUATES_API: BASE_URL + "/auth/delete-graduates",
    PROMOTE_STUDENTS_API: BASE_URL + "/auth/promote-students",
    UPDATE_DP_API: BASE_URL + "/auth/update-dp",
}

export const postEndpoints = {
    CREATE_POST_API: BASE_URL + "/post/create-post",

    EDIT_POST_API: BASE_URL + "/post/editPost",
    DELETE_POST_API: BASE_URL + "/post/deletePost",
    GET_POST_API: BASE_URL + "/post/getPost",
    GET_USER_POSTS_API: BASE_URL + "/post/getuserPosts",
    REPORT_POST_API: BASE_URL + "/post/reportPost",
}

export const likeEndpoints = {
    LIKED_API: BASE_URL + "/like/liked",
    GET_ALL_LIKES_API: BASE_URL + "/like/getLikes",
}

export const commentEndpoints = {
    CREATE_COMMENT_API: BASE_URL + "/comment/createComment",
    DELETE_COMMENT_API: BASE_URL + "/comment/removeComment",
    GET_ALL_COMMENTS_API: BASE_URL + "/comment/getAllComments",
    GET_USER_COMMENTS_API: BASE_URL + "/comment/getUserComments",
}

export const replyEndpoints = {
    CREATE_REPLY_API: BASE_URL + "/reply/createReply",
    DELETE_REPLY_API: BASE_URL + "/reply/deleteReply",
    GET_ALL_REPLIES_API: BASE_URL + "/reply/getAllReplies",
}




