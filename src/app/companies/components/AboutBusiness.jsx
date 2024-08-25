/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import React from 'react';

function AboutBusiness({ about = '' }) {
  return (
    <Box mt={8}>
      <Typography variant="h3" className=" font-bold">
        About the business
      </Typography>
      <Box className="mt-6">
        <Typography variant="h6" className="font-semibold">
          Kadum Hair är en frisör i Malmö. Hos oss möts du av erfarna hårstylister för saker som färgning och
          styling av ditt hår, samt barberare som erbjuder Malmös bästa Fade. Vi strävar efter att inte bara
          leverera en hårklippning, utan en hel upplevelse där vi även utbildar kunden kring sitt hår och
          tillbehör.
        </Typography>
      </Box>
    </Box>
  );
}

AboutBusiness.propTypes = {
  about: PropTypes.string,
};

export default AboutBusiness;
