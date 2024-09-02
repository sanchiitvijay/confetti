import { setDevice } from "../../slices/notificationSlice";
import { notificationEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const {
    HANDLE_DEVICE_API,
    GET_INSTAID_API
} = notificationEndpoints;


export function handleDevice(userId,token,identifier) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST", HANDLE_DEVICE_API, {
                userId,
                identifier,
            }, {
                Authorization: `Bearer ${token}`,
            })

            if (!response?.data?.success) {
                throw new Error("Some error in handling devices")
            }

            dispatch(setDevice(identifier));
        }
        catch (err) {
            console.log("API ERROR IN HANDLING DEVICES");
            console.log(err);
        }
    }
}

export function getInstaId(token,postId){
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST", GET_INSTAID_API, {
                postId,
            }, {
                Authorization: `Bearer ${token}`,
            })

            if (!response?.data?.success) {
                throw new Error("Some error in getting instaid")
            }

            return response?.data?.instagram;
        }
        catch (err) {
            console.log("API ERROR IN GETTING INSTAID");
            console.log(err);
        }
    }
}