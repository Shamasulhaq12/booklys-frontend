'use server';

import { cookies } from 'next/headers';

export const deleteTokenCookie = async () => {
  cookies().delete('token');
};

export const createTokenCookie = async data => {
  'use server';

  const oneDay = 24 * 60 * 60 * 1000;

  cookies().set('token', data?.token, {
    expires: Date.now() + oneDay,
  });
};
