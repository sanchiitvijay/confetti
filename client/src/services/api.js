const BASE_URL = process.env.REACT_APP_BASE_URL


export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changePassword",
}

export const userEndpoints = {
    GET_ALL_USERS_API: BASE_URL + "/user/getAllUsers",
    REMOVE_USER_API: BASE_URL + "/user/removeUser",
    EDIT_USER_API: BASE_URL + "/user/editUser",
    DELETE_USER_API: BASE_URL + "/user/deleteUser",
    DELETE_GRADUATES_API: BASE_URL + "/user/deleteGraduates",
    PROMOTE_STUDENTS_API: BASE_URL + "/user/promoteStudents",
}

export const postEndpoints = {
    CREATE_POST_API: BASE_URL + "/post/createPost",
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
    CREATE_COMMENTS_API: BASE_URL + "/comment/createComment",
    REMOVE_COMMENTS_API: BASE_URL + "/comment/removeComment",
    GET_ALL_COMMENTS_API: BASE_URL + "/comment/getAllComments",
    GET_USER_COMMENTS_API: BASE_URL + "/comment/getUserComments",
}

export const replyEndpoints = {
    CREATE_REPLY_API: BASE_URL + "/reply/createReply",
    DELETE_REPLY_API: BASE_URL + "/reply/deleteReply",
    GET_ALL_REPLIES_API: BASE_URL + "/reply/getAllReplies",
}




