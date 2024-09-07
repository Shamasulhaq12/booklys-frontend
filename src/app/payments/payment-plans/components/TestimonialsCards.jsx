import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

function TestimonialsCards() {
  return (
    <Box className=" flex flex-col bg-white p-4">
      <Typography variant="body3">
        &quot;Den integrerade kassan är min absoluta favoritfunktion: här kan vi enkelt och snabbt ta betalt,
        dela upp betalningen med olika betalsätt och som bonus sedan på ett enkelt sätt, i kundens historik,
        följa dennes tidigare produktköp och göra uppföljningar samt få en direkt prognos av hur ekonomin ser
        ut för dagen.&quot;
      </Typography>
      <Box className=" mt-10 flex items-center gap-4">
        <Avatar src="" />
        <Box>
          <Typography variant="h6" className=" font-semibold">
            Sofia Arvani
          </Typography>
          <Typography variant="body2" className=" text-grey">Grundare, Scratch Salonger</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default TestimonialsCards;
