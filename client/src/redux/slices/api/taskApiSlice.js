import { apiSlice } from "../apiSlice";

const TASK_URL = "/task";
export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStatistics: builder.query({
            query: () => ({
                url: `${TASK_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),
        getAllTasks: builder.query({
            query: () => ({
                url: `${TASK_URL}/`,
                method: "GET",
                credentials: "include",
            }),
        }),
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        duplicateTask: builder.mutation({
            query: (id) => ({
                url: `${TASK_URL}/duplicate/${id}`,
                method: "POST",
                credentials: "include",
            }),
        }),
        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/update/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        trashTask: builder.mutation({
            query: ({ id }) => ({
                url: `${TASK_URL}/${id}`,
                method: "PUT",
                credentials: "include",
            }),
        }),

        createSubTask: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASK_URL}/create-subtask/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useGetDashboardStatisticsQuery,
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDuplicateTaskMutation,
    useTrashTaskMutation,
    useCreateSubTaskMutation,
} = taskApiSlice;
