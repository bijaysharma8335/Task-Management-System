import { createSlice } from "@reduxjs/toolkit";


let user = null;

try {
    const stored = localStorage.getItem("userInfo");
    user = stored && stored !== "undefined" ? JSON.parse(stored) : null;
} catch (error) {
    console.error("Failed to parse userInfo from localStorage:", error);
    user = null;
}

const initialState = {
    user,
    isSidebarOpen: false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem("userInfo");
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
    },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;
