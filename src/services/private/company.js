import { privateAPi } from '.';

export const companyApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getCompany: build.query({
      query: params => ({
        url: '/services/company/',
        method: 'GET',
        params,
      }),
      providesTags: ['GetCompany'],
    }),

    getCompanyById: build.query({
      query: slug => `/services/company/${slug}/`,
      providesTags: ['GetCompanyById'],
    }),

    addCompany: build.mutation({
      query: body => ({
        url: '/services/company/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetCompany'],
    }),

    updateCompany: build.mutation({
      query: body => ({
        url: `/services/company/${body?.slug}/`,
        method: 'PUT',
        body: body?.formData,
      }),
      invalidatesTags: ['GetCompany', 'GetCompanyById'],
    }),

    deleteCompany: build.mutation({
      query: slug => ({
        url: `/services/company/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetCompany', 'GetCompanyById'],
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useAddCompanyMutation,
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
