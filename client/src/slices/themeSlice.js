import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: localStorage.getItem("darkMode") === "true",
    loading: false,
    stats: localStorage.getItem("stats") === "false",
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
        },
        setStats(state, action) {
            state.stats = action.payload;
            localStorage.setItem("stats", action.payload);
        }

    }
});

export const { setDarkMode, toggleDarkMode, setStats } = themeSlice.actions;
export default themeSlice.reducer;
