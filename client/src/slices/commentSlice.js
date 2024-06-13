import {createSlice} from "@reduxjs/toolkit"

const initialState={
    comment:localStorage.getItem("comment")?(JSON.parse(localStorage.getItem("comment"))):(null),
    loading:false,
}


const commentSlice=createSlice({
    name:"comment",
    initialState:initialState,
    reducers:{
        setComments(state,value){
            state.comment=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        }

    }
})

export const {setComments,setLoading} = commentSlice.actions;
export default commentSlice.reducer;