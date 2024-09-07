/* eslint-disable no-sequences */
import { privateAPi } from '.';

export const bookingApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getBookings: build.query({
      query: body => ({
        url: '/booking/bookings/',
        method: 'GET',
        params: body,
      }),
      providesTags: ['GetBookings'],
    }),
    getBooking: build.query({
      query: id => ({
        url: `/booking/bookings/${id}/`,
        method: 'GET',
      }),
      providesTags: ['GetBookings'],
    }),
    updateBooking: build.mutation({
      query: values => ({
        url: `/booking/bookings/${values?.id}/`,
        method: 'PATCH',
        body: values,
      }),
      invalidatesTags: ['GetBookings'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useUpdateBookingMutation
} = bookingApi;
