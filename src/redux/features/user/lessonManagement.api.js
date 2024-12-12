import { baseApi } from "../../api/baseApi";

const lessonManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //& Lesson Hook Start
    getAllLessons: builder.query({
      query: () => {
        return {
          url: "/lessons",
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "lesson" }],
    }),
    getSinglelLesson: builder.query({
      query: (params) => {
        return {
          url: `/lessons/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "lesson" }],
    }),
    getSinglelLessonByNumber: builder.query({
      query: (params) => {
        return {
          url: `/lessons/lesson/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "lesson" }],
    }),
    getAllLessonsByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/lessons/pagination`,
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
      providesTags: [{ type: "lesson" }],
    }),
    addLesson: builder.mutation({
      query: (data) => {
        return {
          url: "/lessons",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "lesson" }],
    }),
    updateLesson: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `lessons/${id}`,
          method: "PATCH",
          body: data, // Ensure `data` is a FormData object
        };
      },
      invalidatesTags: [{ type: "lesson" }],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "lesson" }],
    }),
  }),
});

export const {
  useGetAllLessonsQuery,
  useGetSinglelLessonQuery,
  useGetAllLessonsByPaginationQuery,
  useGetSinglelLessonByNumberQuery,
  useAddLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonManagementApi;
