'use client';

import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useGetPaypalPlansListQuery } from '@/services/private/paypal';
import SectionLoader from '@/app/common/loaders/SectionLoader';
import { plansList } from '../../utilities/data';
import PlanCard from '../../components/PlanCard';

function PlanCardsContainer() {
  const { isLoading, isFetching } = useGetPaypalPlansListQuery();
  const loading = isLoading || isFetching;
  return loading ? (
    <SectionLoader />
  ) : (
    <Box className="plan_card_wrapper">
      <Grid container height="100%" width="100%" alignItems="center" justifyContent="center">
        <Grid item xs={12} lg={12}>
          <Stack textAlign="center" pt={2} pb={2}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
              Simple And Affordable Pricing
            </Typography>
            <p style={{ color: 'white' }}>Choose a plan to suit your business</p>
          </Stack>
        </Grid>

        <Grid container spacing={7} item xs={9} lg={12} xl={9}>
          {plansList?.map(plan => (
            <PlanCard key={plan.planId} plan={plan} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default PlanCardsContainer;
