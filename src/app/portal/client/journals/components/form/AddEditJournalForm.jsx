/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import FormikField from '@/shared/components/form/FormikField';
import FormikSelect from '@/shared/components/form/FormikSelect';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import { useAddJournalsMutation, useUpdateJournalsMutation } from '@/services/private/journals';
import { journalFormInitVals, journalFormValSchema } from '../../utilities/formUtils';

function AddEditJournalForm({ journalData = {} }) {
  const [initValues, setInitValues] = useState(journalFormInitVals);

  const [addJournal, { error, isSuccess }] = useAddJournalsMutation();
  const [updateJournal, { error: editError, isSuccess: isEditSuccess }] = useUpdateJournalsMutation();
  useHandleApiResponse(error, isSuccess, 'Journal added successfully!', true);
  useHandleApiResponse(editError, isEditSuccess, 'Journal updated successfully!', true);
  useEffect(() => {
    if (journalData) {
      setInitValues({
        name: journalData?.name || '',
      });
    }
  }, [journalData]);
  return (
    <Box sx={{ borderRadius: '10px' }} className="bg-white p-8">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={journalFormValSchema}
        onSubmit={async values => {
          if (journalData) {
            await updateJournal({ values, slug: journalData?.service_slug });
          } else {
            await addJournal(values);
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
                    name="price"
                    label="Price"
                    isRequired
                    type="number"
                    placeholder="price"
                    isStack
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <FormikSelect
                    name="owner"
                    label="Owner"
                    options={[]}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />
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

AddEditJournalForm.propTypes = {
  journalData: PropTypes.object,
};

export default AddEditJournalForm;
