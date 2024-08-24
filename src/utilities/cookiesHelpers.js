'use server';

import { cookies } from 'next/headers';

export const deleteTokenCookie = async () => {
  cookies().delete('token');
};

export const createTokenCookie = async data => {
  'use server';

  const twelveHours = 12 * 60 * 60 * 1000;

  cookies().set('token', data?.access, {
    expires: Date.now() + twelveHours,
  });
};

export const createPaymentCookie = async data => {
  cookies().set('is_payment_verified', data?.is_payment_verified);
};
