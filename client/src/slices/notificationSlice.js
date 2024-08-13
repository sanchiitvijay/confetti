import {createSlice} from "@reduxjs/toolkit"

const initialState={
    device:localStorage.getItem("device") ? localStorage.getItem("device"):null,
}


const notificationSlice = createSlice({
    name:"notification",
    initialState:initialState,
    reducers:{
        setDevice(state,value){
            state.device=value.payload
            localStorage.setItem("device",value.payload);
        }

    }
})

export const {setDevice}=notificationSlice.actions

export default notificationSlice.reducer;