import { Box, Typography } from '@mui/material';
import React from 'react';
import AuthGridWrapper from '@/app/common/components/wrappers/AuthGridWrapper';
import { primary } from '@/styles/common/colors';
import ForgetPasswordForm from './components/ForgetPasswordForm';

function ForgetPassword() {
  return (
    <AuthGridWrapper heading="We're excited to see how you work!">
      <Box sx={{ padding: '40px 60px', minWidth: '600px', maxWidth: '650px' }}>
        <Box sx={{ padding: '10px' }} className=" lg:mb-4 md:mb-3">
          <Typography variant="h4" sx={{ color: primary }} className="mb-1 text-center font-bold ">
            Forgot Password
          </Typography>
          <Typography variant="h6" className="my-2 text-center">
            Enter your email to reset your password
          </Typography>
        </Box>
        <ForgetPasswordForm />
      </Box>
      <Typography variant="body2" className="absolute" color="grey" sx={{ bottom: '5px' }}>
        Powered by{' '}
        <a
          href="https://beyonderissolutions.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'grey', fontSize: 'inherit' }}
        >
          {' '}
          Beyond Eris Solutions&#169; 2024
        </a>
      </Typography>
    </AuthGridWrapper>
  );
}

export default ForgetPassword;
