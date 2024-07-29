'use client';

import { Box, Button, Divider, Modal, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import AddNewButton from '@/app/common/components/AddNewButton';
import ServiceTable from './components/ServiceTable';
import { border } from '@/styles/common/colors';
import TabPanel from '@/shared/components/TabPanel';
import ModalHeader from '@/app/common/components/ModalHeader';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import AddEditBasicServicesForm from './components/AddEditBasicServicesForm';

function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="pageTitle">{activeTab === 0 ? 'Services' : 'Basic Services'}</Typography>
        {activeTab === 0 ? (
          <AddNewButton label="Create Service" path="/portal/client/services/add" />
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Add />}
            onClick={toggleAddModal}
          >
            Create Users
          </Button>
        )}
      </Stack>
      <Paper>
        <Tabs className="p-3" value={activeTab} onChange={handleTabChange}>
          <Tab wrapped label="Services" />

          <Tab wrapped label="Basic Services" />
        </Tabs>
        <TabPanel stateValue={activeTab} index={0}>
          <Box mt={1}>
            <Divider sx={{ borderColor: border, marginBottom: 3 }} />
          </Box>
          <ServiceTable />
        </TabPanel>
        <TabPanel stateValue={activeTab} index={1}>
          <Box mt={1}>
            <Divider sx={{ borderColor: border, marginBottom: 3 }} />
          </Box>
          <ServiceTable />
        </TabPanel>
        <Modal open={isAddModalOpen} onClose={toggleAddModal}>
          <Box sx={{ ...formModalStyles, width: '900px', height: '100vh' }}>
            <ModalHeader title="New basic service" onClose={toggleAddModal} />
            <AddEditBasicServicesForm />
          </Box>
        </Modal>
      </Paper>
    </>
  );
}

export default Services;
