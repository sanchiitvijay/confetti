import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "..apiconnector"
import { userEndpoints } from "../apis"

const {
    GET_ALL_USERS_API,
    REMOVE_USER_API,
    EDIT_USER_API,
    DELETE_USER_API,
    DELETE_GRADUATES_API,
    PROMOTE_STUDENTS_API
} = userEndpoints;

