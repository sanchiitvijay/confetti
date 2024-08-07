import {createSlice} from "@reduxjs/toolkit"

const initialState={
    like:localStorage.getItem("like")?(JSON.parse(localStorage.getItem("like"))):[],
    loading:false,
}


const likeSlice=createSlice({
    name:"like",
    initialState:initialState,
    reducers:{
        setLikes(state,value){
            state.like=value.payload
            localStorage.setItem("like",JSON.stringify(value.payload))
        },
        setLoading(state,value){
            state.loading=value.payload
            localStorage.setItem("loading",JSON.stringify(value.payload))
        }

    }
})

export const {setLikes,setLoading} = likeSlice.actions;
export default likeSlice.reducer;