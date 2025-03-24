import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const API_URL = "https://localhost:8800/api";

const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    endpoints: (builder) => ({}),
});
