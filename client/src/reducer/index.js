import {combineReducers} from "@reduxjs/toolkit"
/* Reducers here in the format 
    import reducer_name from "pathofreducer"
    Add more slices like that and add their reducers here
    */
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import themeReducer from "../slices/themeSlice"
import postReducer from "../slices/postSlice"
import replyReducer from "../slices/replySlice"
import likeReducer from "../slices/likeSlice"
import commentReducer from "../slices/commentSlice"
const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    theme: themeReducer,
    post:postReducer,
    reply:replyReducer,
    like:likeReducer,
    comment:commentReducer
})

export default rootReducer;