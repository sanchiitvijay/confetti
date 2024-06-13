import {createSlice} from "@reduxjs/toolkit"

const initialState={
    post:localStorage.getItem("post")?(JSON.parse(localStorage.getItem("post"))):(null),
    comments:[],
    totalLikes:localStorage.getItem("totalLikes")?(Number.parseInt(localStorage.getItem("Likes"))):(0),
    loading:false,
}


const postSlice=createSlice({
    name:"post",
    initialState:initialState,
    reducers:{
        setPost(state,value){
            state.post=value.payload
        },
        setComments(state,value){
            state.comments=value.payload
        },
        setTotalLikes(state,value){
            state.totalLikes=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        }

    }
})

export const {setPost, setComments,setTotalLikes,setLoading} = postSlice.actions;
export default postSlice.reducer;