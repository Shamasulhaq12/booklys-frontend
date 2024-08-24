import { privateAPi } from '.';

export const journalsApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getJournals: build.query({
      query: params => ({
        url: '/user-profile/user-profile/',
        method: 'GET',
        params,
      }),
      providesTags: ['GetJournals'],
    }),

    getJournalsById: build.query({
      query: slug => `/services/company/${slug}/`,
      providesTags: ['GetJournalsById'],
    }),

    addJournals: build.mutation({
      query: body => ({
        url: '/user-profile/user-profile/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetJournals'],
    }),

    updateJournals: build.mutation({
      query: body => ({
        url: `/services/company/${body?.slug}/`,
        method: 'PUT',
        body: body?.formData,
      }),
      invalidatesTags: ['GetJournals', 'GetJournalsById'],
    }),

    deleteJournals: build.mutation({
      query: slug => ({
        url: `/services/company/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetJournals', 'GetJournalsById'],
    }),
  }),
});

export const {
  useGetJournalsQuery,
  useAddJournalsMutation,
  useGetJournalsByIdQuery,
  useUpdateJournalsMutation,
  useDeleteJournalsMutation,
} = journalsApi;
