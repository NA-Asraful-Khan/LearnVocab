import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //& User Hook Start
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "user" }],
    }),
    getSinglelUser: builder.query({
      query: (params) => {
        return {
          url: `/users/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "user" }],
    }),
    getAllUsersByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/users/pagination`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "user" }],
    }),
    addUser: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "user" }],
    }),
    updateUser: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `users/update/${id}`,
          method: "PATCH",
          body: data, // Ensure `data` is a FormData object
        };
      },
      invalidatesTags: [{ type: "user" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "user" }],
    }),

    changeUserRole: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [
        { type: "user" }, // Add more types as needed
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSinglelUserQuery,
  useGetAllUsersByPaginationQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useChangeUserRoleMutation,
} = userManagementApi;
