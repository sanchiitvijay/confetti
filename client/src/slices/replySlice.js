import {createSlice} from "@reduxjs/toolkit"

const initialState={
    reply:localStorage.getItem("reply")?(JSON.parse(localStorage.getItem("reply"))):[],
    loading:false,
}


const replySlice=createSlice({
    name:"reply",
    initialState:initialState,
    reducers:{
        setReplies(state,value){
            state.reply=value.payload
            localStorage.setItem("reply",JSON.stringify(state.reply))
        },
        setLoading(state,value){
            state.loading=value.payload
        }

    }
})

export const {setReplies,setLoading} = replySlice.actions;
export default replySlice.reducer;