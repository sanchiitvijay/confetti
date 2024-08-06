import {createSlice} from "@reduxjs/toolkit"

const initialState={
    post:localStorage.getItem("post")?(JSON.parse(localStorage.getItem("post"))):[],
    totalPosts:localStorage.getItem("totalPosts")?(Number.parseInt(localStorage.getItem("totalPosts"))):0,
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
            localStorage.setItem("post",JSON.stringify(state.post))
        },
        setComments(state,value){
            state.comments=value.payload
        },
        setTotalLikes(state,value){
            state.totalLikes=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setTotalPosts(state,value){
            state.totalPosts=value.payload
            localStorage.setItem("totalPosts",JSON.stringify(state.totalPosts))
        }

    }
})

export const {setPost, setComments,setTotalLikes,setLoading, setTotalPosts} = postSlice.actions;
export default postSlice.reducer;