import { privateAPi } from '.';

const brandsApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    sendPaymentStatus: build.mutation({
      query: payload => ({
        url: '/payments-and-subscription/subscriptions/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['sendPaymentStatus'],
      invalidatesTags: ['loadUser'],
    }),
    getPaypalPlansList: build.query({
      query: () => ({
        url: '/payments-and-subscription/subscriptions/',
        method: 'GET',
      }),
      providesTags: ['getPaypalPlansList'],
    }),
    getBooking: build.query({
      query: () => ({
        url: '/booking/bookings/',
        method: 'GET',
      }),
      providesTags: ['GetBooking'],
    }),
    addBookingStatus: build.mutation({
      query: payload => ({
        url: '/booking/bookings/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['GetBooking'],
    }),
    updateBookingPaymentStatus: build.mutation({
      query: id => ({
        url: `/booking/bookings/${id}/`,
        method: 'PATCH',
        body: {
          payment_status: true,
        },
      }),
      invalidatesTags: ['GetBooking'],
    }),
  }),
});

export const {
  useSendPaymentStatusMutation,
  useGetPaypalPlansListQuery,
  useAddBookingStatusMutation,
  useUpdateBookingPaymentStatusMutation,
} = brandsApi;
