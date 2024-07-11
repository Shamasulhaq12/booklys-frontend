import { privateAPi } from '.';

export const authApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    authorized: build.query({
      query: () => '/api/user/me/',
      providesTags: ['GetAuthorizedUser'],
    }),

  }),
});

export const { useAuthorizedQuery, useLazyAuthorizedQuery } = authApi;
