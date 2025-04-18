import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL + "/api",
    credentials: "include", // for cookies
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    endpoints: (builder) => ({}),
});
