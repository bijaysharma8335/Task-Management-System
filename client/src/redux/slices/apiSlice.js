import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const API_URL = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({ baseUrl: API_URL+"/api" });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    endpoints: (builder) => ({}),
});
