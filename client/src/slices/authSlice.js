import {createSlice} from "@reduxjs/toolkit"

const initialState={
    token:localStorage.getItem("token") ? localStorage.getItem("token"):null,
    loading:false,
    signupData:null,
    redirection:null 
}


const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload
            localStorage.setItem("token",value.payload)
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setSignupData(state,value){
            state.signupData=value.payload
        },
        setRedirection(state,value){
            state.redirection=value.payload
        }

    }
})

export const {setSignupData,setLoading,setToken, setRedirection}=authSlice.actions

export default authSlice.reducer;