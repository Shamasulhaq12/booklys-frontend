import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import AuthGridWrapper from '@/app/common/components/wrappers/AuthGridWrapper';
import { primary } from '@/styles/common/colors';
import ResetPasswordForm from './components/ResetPasswordForm';

function ResetPassword({ params: { id } }) {
  return (
    <AuthGridWrapper heading="We're excited to see how you work!">
      <Box sx={{ padding: '40px 60px', minWidth: '600px', maxWidth: '650px' }}>
        <Box sx={{ padding: '10px' }} className="mb-lg-4 mb-md-3">
          <Typography variant="h4" sx={{ color: primary }} className="mb-1 text-center font-bold ">
            Create New Password
          </Typography>
        </Box>
        <ResetPasswordForm token={id} />
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

ResetPassword.propTypes = {
  params: PropTypes.object,
};

export default ResetPassword;
