import {createSlice} from "@reduxjs/toolkit"

const initialState={
    post:[],
    totalPosts:localStorage.getItem("totalPosts")?(Number.parseInt(localStorage.getItem("totalPosts"))):0,
    comments:[],
    totalLikes:localStorage.getItem("totalLikes")?(Number.parseInt(localStorage.getItem("Likes"))):[],
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
            const posts = JSON.parse(localStorage.getItem("post"));
            const post = posts.find(post => post._id === value.payload.post);
            if (post) {
                if (!post.likes.includes(value.payload.author)) {
                  post.likes.push(value.payload.author);
                }
                else {
                    post.likes = post.likes.filter(like => like !== value.payload.author);
                }
                localStorage.setItem("post", JSON.stringify(posts));
            }
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