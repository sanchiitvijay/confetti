import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    userPost:localStorage.getItem("userPost")?(JSON.parse(localStorage.getItem("userPost"))):[],
    userTotalPosts:localStorage.getItem("userTotalPosts")?(Number.parseInt(localStorage.getItem("userTotalPosts"))):0,
    loading: false,
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
        }

    },
});

export const {setUser, setLoading,setUserPost,setUserTotalPosts} = profileSlice.actions;
export default profileSlice.reducer;