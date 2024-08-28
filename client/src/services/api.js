const BASE_URL = "http://localhost:4000/api/v1"


export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SENDOTP_API: BASE_URL + "/auth/send-otp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    VALIDATE_SIGNUP: BASE_URL + "/auth/validate-signup",
}

export const notificationEndpoints={
 HANDLE_DEVICE_API: BASE_URL + "/notification/handle-device"
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
    SEND_FEEDBACK_API: BASE_URL + "/feedback/write-feedback",
    GET_FEEDBACK_API: BASE_URL + "/feedback/get-feedback",
    
}

export const postEndpoints = {
    CREATE_POST_API: BASE_URL + "/post/create-post",
    EDIT_POST_API: BASE_URL + "/post/edit-post",
    DELETE_POST_API: BASE_URL + "/post/delete-post",
    GET_POST_API: BASE_URL + "/post/get-post",
    GET_USER_POSTS_API: BASE_URL + "/post/get-user-posts",
    REPORT_POST_API: BASE_URL + "/post/report-post",
    GET_USER_POST_STATS_API: BASE_URL + "/post/get-user-stats",
    POST_EXIST_API: BASE_URL + "/post/post-exist",
}

export const likeEndpoints = {
    LIKED_API: BASE_URL + "/like/liked",
    GET_ALL_LIKES_API: BASE_URL + "/like/get-likes",
}

export const commentEndpoints = {
    CREATE_COMMENT_API: BASE_URL + "/comment/create-comment",
    DELETE_COMMENT_API: BASE_URL + "/Comment/remove-comment",
    GET_ALL_COMMENTS_API: BASE_URL + "/comment/get-all-comments",
    GET_USER_COMMENTS_API: BASE_URL + "/comment/get-user-comments",
}

export const replyEndpoints = {
    CREATE_REPLY_API: BASE_URL + "/reply/create-reply",
    DELETE_REPLY_API: BASE_URL + "/reply/delete-reply",
    GET_ALL_REPLIES_API: BASE_URL + "/reply/get-all-replies",
}




