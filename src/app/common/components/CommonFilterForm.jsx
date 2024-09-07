/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Button, CircularProgress, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SubmitBtn from './SubmitBtn';
// import { ratingOptions } from '../utilities/data';
import { searchFilterFormInitialValue } from '../utilities/formUtils';
import FormikSearchInput from '@/shared/components/form/FormikSearchInput';
import FormikSelect from '@/shared/components/form/FormikSelect';
import { formikSearchSelectStyles } from '@/styles/formik/formik-styles';
// import { transformFilterOptions } from '@/utilities/transformers';
// import { useGetCitiesQuery } from '@/services/private/profile';
// import { useGetCategoriesQuery, useLazyGetSubCategoriesQuery } from '@/services/private/categories';

function CommonFilterForm({
  searchParams = {},
  onFormSubmit = () => {},
  isLoading = false,
  isAdmin = false,
  isAllServices = false,
  placeholderText = 'Search ...',
}) {
  const [initValues, setInitValues] = useState(searchFilterFormInitialValue);
  const params = useSearchParams();
  const paramsObject = Object.fromEntries(params.entries());

  const router = useRouter();
  // const { data: cities = [] } = useGetCitiesQuery({ country: 8 });
  // const { data: categoriesData } = useGetCategoriesQuery();
  // const [getSubcategoriesData, { data: subcategoriesData = [] }] = useLazyGetSubCategoriesQuery();
  // const citiesOptions = transformFilterOptions(cities?.results, 'name', 'id');

  useEffect(() => {
    if (paramsObject?.search || paramsObject?.city) {
      setInitValues({
        search: paramsObject?.search || '',
        city: paramsObject?.city || '',
      });
    }
  }, [paramsObject?.search, paramsObject?.city]);

  //   TRANSFORMERS
  // const categoriesOptions = useMemo(() => {
  //   if (categoriesData) {
  //     return categoriesData?.results?.map(item => ({
  //       label: item.name,
  //       value: item.id,
  //     }));
  //   }

  //   return [];
  // }, [categoriesData]);

  // const subCategoriesOptions = useMemo(() => {
  //   if (subcategoriesData) {
  //     return subcategoriesData?.results?.map(item => ({
  //       label: item.name,
  //       value: item.id,
  //     }));
  //   }

  //   return [];
  // }, [subcategoriesData]);

  const isFilterApplied = (values = {}) => {
    let applied = false;

    Object.values(values).forEach(value => {
      if (value) {
        applied = true;
      }
    });

    return applied;
  };

  // const handleChange = async newValue => {
  //   if (newValue) {
  //     await getSubcategoriesData({ category: newValue });
  //   }
  // };

  // const handleSearch = (newValue, resetForm) => {
  //   if (isAdmin) {
  //     if (!newValue) {
  //       onFormSubmit(searchFilterFormInitialValue);
  //       resetForm({ values: searchFilterFormInitialValue });
  //     }
  //   }
  // };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={async values => {
        if (values?.search || values?.city) {
          const queryParams = {};

          Object.entries(values).forEach(([key, value]) => {
            if (value) {
              queryParams[key] = value;
            }
          });

          const searchQuery = new URLSearchParams(queryParams).toString();
          router.push(`/search?${searchQuery}`);
        }
      }}
      enableReinitialize
    >
      {({ values, resetForm }) => (
        <Form className=" w-full flex justify-center">
          <Grid
            className="w-full max-h-14 overflow-hidden"
            justifyContent="center"
            alignItems="center"
            container
          >
            {/* SEARCH  */}
            <Grid item xs={5.375}>
              <FormikSearchInput
                className="rounded-s-full h-14"
                name="search"
                placeholder={placeholderText}
              />
            </Grid>

            {/* CITY */}
            <Grid item xs={5.375}>
              <FormikSelect
                name="city"
                options={[]}
                className=" h-14"
                style={formikSearchSelectStyles}
                placeholder="City"
                isPortal
              />
            </Grid>

            <Grid item xs={1.25}>
              <Button
                className=" shadow-none h-14 w-full rounded-s-none rounded-e-full"
                size="small"
                startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
                disabled={isLoading}
                variant="contained"
                type="submit"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

CommonFilterForm.propTypes = {
  searchParams: PropTypes.object,
  onFormSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isAllServices: PropTypes.bool,
  placeholderText: PropTypes.string,
};

export default CommonFilterForm;
