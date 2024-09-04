import { privateAPi } from '.';

export const journalsApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getJournals: build.query({
      query: params => ({
        url: '/booking/journals/',
        method: 'GET',
        params,
      }),
      providesTags: ['GetJournals'],
    }),

    getJournalsById: build.query({
      query: slug => `/services/company/${slug}/`,
      providesTags: ['GetJournalsById'],
    }),

    addJournal: build.mutation({
      query: body => ({
        url: '/booking/journals/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetJournals'],
    }),

    updateJournal: build.mutation({
      query: values => ({
        url: `/booking/journals/${values?.id}/`,
        method: 'PUT',
        body: values,
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
    getOwners: build.query({
      query: params => ({
        url: '/user-profile/user-profile/',
        method: 'GET',
        params,
      }),
      providesTags: ['GetJournals'],
    }),
  }),
});

export const {
  useGetJournalsQuery,
  useAddJournalMutation,
  useGetJournalsByIdQuery,
  useUpdateJournalMutation,
  useDeleteJournalsMutation,
  useGetOwnersQuery
} = journalsApi;
