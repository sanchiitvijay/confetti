import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: localStorage.getItem("darkMode") === "true",
    loading: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        setDarkMode(state, action) {
            state.darkMode = action.payload;
            localStorage.setItem("darkMode", action.payload);
        },
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem("darkMode", state.darkMode);
        }
    }
});

export const { setDarkMode, toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
