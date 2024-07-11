import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '@/app/loading';

// API & CUSTOM HOOKS
import { useLazyAuthorizedQuery } from '@/services/private/auth';

// STORE & UTILS
import { onAuthorized, onLoggedOut } from '@/store/slices/authSlice';
import { deleteTokenCookie } from '@/utilities/cookiesHelpers';

function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const [getAsyncAuthorizedUser, { data, isSuccess, isLoading: loadingAuth, isError }] =
    useLazyAuthorizedQuery();

  useEffect(() => {
    const getData = async () => {
      await getAsyncAuthorizedUser();
    };

    getData();
  }, []);

  const isLoading = loadingAuth;

  useEffect(() => {
    if (isSuccess) {
      dispatch(onAuthorized(data));
    } else if (isError) {
      dispatch(onLoggedOut());
      deleteTokenCookie();
    }
  }, [data, loadingAuth, isSuccess]);

  if (isLoading) return <Loading />;

  return children;
}

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;
