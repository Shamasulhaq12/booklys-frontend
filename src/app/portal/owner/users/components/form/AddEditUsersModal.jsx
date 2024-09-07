/* eslint-disable react/prop-types */
import { Box, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import UserContext from '@/context/UserContext';
import { useGetCallingCodeTransformer } from '@/customHooks/useTransformers';
import { useGetCountryCallingCodesQuery } from '@/services/public/lookups';
import { usersStepsInfo } from '../../utilities/data';
import StyledStep from '@/app/common/components/StyledStep';
import BasicInfoForm from './BasicInfoForm';
import SettingForm from './SettingForm';
import WorkScheduleForm from './WorkScheduleForm';

function AddEditUsersModal({ selectedUserData, toggleAddModal }) {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedUserData?.id) {
      setUserData({
        first_name: selectedUserData?.first_name || '',
        last_name: selectedUserData?.last_name || '',
        nick_name: selectedUserData?.nick_name || '',
        signature: selectedUserData?.signature || '',
        social_security_number: selectedUserData?.social_security_number || '',
        calling_code: selectedUserData?.calling_code || '',
        email: selectedUserData?.email || '',
        phone: selectedUserData?.phone || '',
        designation: selectedUserData?.designation || '',
        is_student: selectedUserData?.is_student || false,
        price_group: selectedUserData?.price_group || '',
        work_from: selectedUserData?.work_from || '',
        is_onsite: selectedUserData?.is_onsite || false,
        company: selectedUserData?.company || '',
        online_booking_available: selectedUserData?.online_booking_available || true,
        booking_interval_in_minutes: selectedUserData?.booking_interval_in_minutes || '',
        availability_days: selectedUserData?.availability_days || '',
        start_time: selectedUserData?.start_time || '',
        break_start_time: selectedUserData?.break_start_time || '',
        break_end_time: selectedUserData?.break_end_time || '',
        end_time: selectedUserData?.end_time || '',
      });
    }
  }, [selectedUserData]);

  // API HOOKS & TRANSFORMERS
  const { data: countryCodeLookups, isSuccess } = useGetCountryCallingCodesQuery();
  const callingCodeOptions = useGetCallingCodeTransformer(countryCodeLookups);

  const userContextValue = useMemo(
    () => ({
      activeStep,
      setActiveStep,
      userData,
      setUserData,
      callingCodeOptions,
      setError,
      error,
      toggleAddModal,
    }),
    [activeStep, userData, callingCodeOptions, isSuccess, error, toggleAddModal]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <Box className=" relative overflow-y-auto " sx={{ maxHeight: 'calc(100% - 60px)' }}>
        <Box className=" sticky bg-white top-0 w-full px-50 z-50" py={5}>
          <Stepper activeStep={activeStep}>
            {usersStepsInfo?.map((step, idx) => (
              <StyledStep key={step?.label}>
                <StepLabel error={error && idx === 0}>{step?.label}</StepLabel>
              </StyledStep>
            ))}
          </Stepper>
        </Box>

        <Box pb={4}>
          {activeStep === 0 && <BasicInfoForm />}

          {activeStep === 1 && <SettingForm />}

          {activeStep === 2 && <WorkScheduleForm />}
        </Box>
      </Box>
    </UserContext.Provider>
  );
}

export default AddEditUsersModal;
