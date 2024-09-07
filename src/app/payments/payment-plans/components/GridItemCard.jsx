import { Box, Typography } from '@mui/material';
import { Target } from 'lucide-react';
import PropTypes from 'prop-types';
import React from 'react';

function GridItemCard({ textAlign = 'center', alignItems = 'center' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems,
        textAlign,
        gap: '8px'
      }}
    >
      <Target />
      <Typography variant="h6" className=" font-semibold">Get discovered</Typography>
      <Typography variant="body2">
        Visible among over 2 million potential customers on both bokadirekt.se and our app.
      </Typography>
    </Box>
  );
}

GridItemCard.propTypes = {
  textAlign: PropTypes.string.isRequired,
  alignItems: PropTypes.string.isRequired,
};

export default GridItemCard;
