/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { companyFormInitVals, companyFormValSchema } from '../../utilities/formUtils';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import FormikField from '@/shared/components/form/FormikField';
import { useAddCompanyMutation, useUpdateCompanyMutation } from '@/services/private/company';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import { ownerOptions } from '../../utilities/data';
import FormikSelect from '@/shared/components/form/FormikSelect';

function AddEditCompanyForm({ companyData = {} }) {
  const [initValues, setInitValues] = useState(companyFormInitVals);

  const [addCompany, { error, isSuccess }] = useAddCompanyMutation();
  const [updateCompany, { error: editError, isSuccess: isEditSuccess }] = useUpdateCompanyMutation();
  useHandleApiResponse(error, isSuccess, 'Company added successfully!', true);
  useHandleApiResponse(editError, isEditSuccess, 'Company updated successfully!', true);

  // useEffect(() => {
  //   if (companyData?.name) {
  //     setInitValues({
  //       name: companyData?.name || '',
  //     });
  //   }
  // }, [companyData]);

  return (
    <Box sx={{ borderRadius: '10px' }} className="bg-white p-8">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={companyFormValSchema}
        onSubmit={async values => {
          if (companyData?.name) {
            await updateCompany({ values, slug: companyData?.service_slug });
          } else {
            await addCompany(values);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue, resetForm }) => (
          <Form>
            <Grid2 spacing={4} container>
              <Grid2 container rowSpacing={4} xs={12} md={6}>
                <Grid2 xs={12}>
                  <FormikField name="name" label="Name" isRequired type="text" placeholder="Name" isStack />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    name="email"
                    label="Email"
                    isRequired
                    type="text"
                    placeholder="Email"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    name="phone"
                    label="Phone"
                    isRequired
                    type="text"
                    placeholder="phone"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikField
                    name="address"
                    label="Address"
                    isRequired
                    type="text"
                    placeholder="Address"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikSelect name="owner" label="Owner" options={ownerOptions} placeholder="Select" isPortal isRequired isStack />
                </Grid2>
              </Grid2>
              <Grid2 container rowSpacing={4} xs={12} md={6}>
                <Grid2 xs={12}>
                  <FormikField
                    name="company_description"
                    label="Company Description"
                    isRequired
                    type="textarea"
                    placeholder="Company Description"
                    rows={7}
                    isStack
                  />
                </Grid2>
              </Grid2>
            </Grid2>
            <Box className="flex w-100 items-end justify-end gap-3" mt={3}>
              <SubmitBtn label="Next" isLoading={isSubmitting} className="rounded-3xl" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

AddEditCompanyForm.propTypes = {
  companyData: PropTypes.object,
};

export default AddEditCompanyForm;
