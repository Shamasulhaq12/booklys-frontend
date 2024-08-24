import { privateAPi } from '.';

export const servicesApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getService: build.query({
      query: params => ({
        url: '/services/services/',
        method: 'GET',
        params,
      }),
      providesTags: ['GetService'],
    }),

    getPopularService: build.query({
      query: () => '/api/service/popular-services/',
      providesTags: ['GetPopularService'],
    }),

    getServiceById: build.query({
      query: slug => `/services/services/${slug}/`,
      providesTags: ['GetServiceById'],
    }),

    addService: build.mutation({
      query: body => ({
        url: '/services/services/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetService', 'GetServiceById'],
    }),

    UpdateService: build.mutation({
      query: body => ({
        url: `/services/services/${body?.slug}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GetService', 'GetServiceById'],
    }),

    deleteService: build.mutation({
      query: slug => ({
        url: `/service/services/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetService', 'GetServiceById'],
    }),

    updateServiceStatus: build.mutation({
      query: body => ({
        url: `/api/service/services/${body?.slug}/`,
        method: 'PATCH',
        body: {
          service_status: body.status,
        },
      }),
      invalidatesTags: ['GetService', 'GetServiceById'],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useGetPopularServiceQuery,
  useAddServiceMutation,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceStatusMutation,
} = servicesApi;
