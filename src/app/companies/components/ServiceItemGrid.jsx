/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function ServiceItemGrid({ title = '', price = '', timing = '', id = null }) {
  return (
    <Box className=" hover:bg-sky-100 flex justify-between items-center transition-all duration-300 cursor-pointer p-3">
      <Box>
        <Typography variant="h6" className="font-semibold">
          Name
        </Typography>
        <Box className=" flex justify-between item-baseline gap-3">
          <Typography variant="h6" className=" text-grey font-semibold">
            Timing, Price
          </Typography>
          <Typography variant="h6" className=" text-sky-700 underline font-semibold">
            More Info
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button variant="contained" className=" bg-dark">
          Book Now
        </Button>
      </Box>
    </Box>
  );
}

ServiceItemGrid.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  timing: PropTypes.string,
  id: PropTypes.number,
};

export default ServiceItemGrid;
