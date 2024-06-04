import {combineReducers} from "@reduxjs/toolkit"
/* Reducers here in the format 
    import reducer_name from "pathofreducer"
    Add more slices like that and add their reducers here
    */
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"

const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
})

export default rootReducer;