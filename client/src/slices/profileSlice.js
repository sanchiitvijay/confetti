import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
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

export const {setUser, setLoading, setTopLikes, setTopPost} = profileSlice.actions;
export default profileSlice.reducer;