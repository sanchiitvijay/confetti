import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    userPost:localStorage.getItem("userPost")?(JSON.parse(localStorage.getItem("userPost"))):[],
    userTotalPosts:localStorage.getItem("userTotalPosts")?(Number.parseInt(localStorage.getItem("userTotalPosts"))):0,
    loading: false,
    topPost: localStorage.getItem("topPost") ? JSON.parse(localStorage.getItem("topPost")) : [],
    topLikes: localStorage.getItem("topLikes") ? JSON.parse(localStorage.getItem("topLikes")) : [],
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
        setUserPost(state,value){
            state.userPost=value.payload
            localStorage.setItem("userPost",JSON.stringify(state.userPost))
        },
        setUserTotalPosts(state,value){
            state.userTotalPosts=value.payload
            localStorage.setItem("userTotalPosts",JSON.stringify(state.userTotalPosts))
        },
          setTopPost(state, value) {
            state.topPost = value.payload;
            localStorage.setItem("topPost", JSON.stringify(state.topPost));
        },
        setTopLikes(state, value) {
            state.topLikes = value.payload;
            localStorage.setItem("topLikes", JSON.stringify(state.topLikes));
        },


    },
});

export const {setUser, setLoading,setUserPost,setUserTotalPosts,setTopLikes, setTopPost} = profileSlice.actions;
export default profileSlice.reducer;