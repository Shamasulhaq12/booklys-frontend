/* eslint-disable no-unused-vars */

'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import { FieldArray, Form, Formik, useFormikContext } from 'formik';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Add } from '@mui/icons-material';
import { border } from '@/styles/common/colors';
import FormikField from '@/shared/components/form/FormikField';
import FormikSelect from '@/shared/components/form/FormikSelect';
import useUserContext from '@/customHooks/useUserContext';
import { staffContactsFormArrayInitVals } from '../../utilities/formUtils';

function ContactFieldArray({ name }) {
  const { values } = useFormikContext();
  const { callingCodeOptions } = useUserContext();

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <Stack className="w-full" rowGap={3} divider={<Divider sx={{ borderColor: border }} />}>
          {values[name].length > 0 &&
            values[name].map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid2 container>
                <Grid2 container spacing={4} xs={12}>
                  <Grid2 container spacing={0} xs={12} md={6}>
                    <Grid2 xs={4} sm={3}>
                      <FormikSelect
                        label="Code"
                        name={`${name}.${index}.country_code`}
                        className=" rounded-e-none"
                        isStack
                        isRequired
                        options={callingCodeOptions}
                      />
                    </Grid2>
                    <Grid2 xs={8} sm={9}>
                      <FormikField
                        label="Phone"
                        name={`${name}.${index}.phone`}
                        type="number"
                        className=" rounded-s-none border-s-0"
                        isStack
                        isRequired
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 xs={12} md={6} width="100%">
                    <FormikField
                      name={`${name}.${index}.email`}
                      label="Email address"
                      isRequired
                      type="text"
                      placeholder="Email address"
                      isStack
                    />
                  </Grid2>
                  <Grid2 xs={12}>
                    <Stack direction="row" justifyContent="end">
                      <Button
                        sx={{ marginLeft: 'auto', bgcolor: theme => theme.palette.action.hover }}
                        color="error"
                        disabled={values[name]?.length === 1}
                        onClick={() => remove(index)}
                        size="small"
                      >
                        Discard
                      </Button>
                    </Stack>
                  </Grid2>
                </Grid2>
              </Grid2>
            ))}
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Button
              sx={{ bgcolor: theme => theme.palette.action.hover }}
              startIcon={<Add />}
              size="small"
              type="button"
              onClick={() => push(staffContactsFormArrayInitVals)}
            >
              Add more
            </Button>
          </Stack>
        </Stack>
      )}
    </FieldArray>
  );
}

ContactFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ContactFieldArray;
