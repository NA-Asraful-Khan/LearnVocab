import { baseApi } from "../../api/baseApi";

const vocabularyManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //& Vocabulary Hook Start
    getAllVocabulary: builder.query({
      query: () => {
        return {
          url: "/vocabulary",
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "vocabulary" }],
    }),
    getSinglelVocabulary: builder.query({
      query: (params) => {
        return {
          url: `/vocabulary/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "vocabulary" }],
    }),
    getSinglelVocabularyByNumber: builder.query({
      query: (params) => {
        return {
          url: `/vocabulary/vocabulary/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "vocabulary" }],
    }),
    getAllVocabularyByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/vocabulary/pagination`,
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
      providesTags: [{ type: "vocabulary" }],
    }),
    addVocabulary: builder.mutation({
      query: (data) => {
        return {
          url: "/vocabulary",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "vocabulary" }],
    }),
    updateVocabulary: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `vocabulary/${id}`,
          method: "PATCH",
          body: data, // Ensure `data` is a FormData object
        };
      },
      invalidatesTags: [{ type: "vocabulary" }],
    }),
    deleteVocabulary: builder.mutation({
      query: (id) => ({
        url: `vocabulary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "vocabulary" }],
    }),
  }),
});

export const {
  useGetAllVocabularyQuery,
  useGetSinglelVocabularyQuery,
  useGetAllVocabularyByPaginationQuery,
  useGetSinglelVocabularyByNumberQuery,
  useAddVocabularyMutation,
  useUpdateVocabularyMutation,
  useDeleteVocabularyMutation,
} = vocabularyManagementApi;
