/* eslint-disable no-unused-vars */

'use client';

import { Box, Container } from '@mui/material';
import React from 'react';
import propTypes from 'prop-types';
import CompanyCards from './components/CompanyCards';
import { useGetPublicCompanyQuery } from '@/services/public/companyServices';

function Search({ searchParams }) {
  const { data, isLoading, isFetching } = useGetPublicCompanyQuery({ category_id: searchParams });
  return (
    <Container variant="portal" sx={{ marginTop: '70px' }}>
      <Box>
        {data?.map(item => (
          <CompanyCards
            key={item?.id}
            title={item?.name}
            id={item?.id}
            images={item?.company_images}
            description={item?.company_description}
            address={item?.address}
          />
        ))}
        {/* <SubCategoriesCard key={item?.id} title={item?.name} id={item?.id} /> */}
      </Box>
    </Container>
  );
}

Search.propTypes = {
  searchParams: propTypes.object,
};
export default Search;
