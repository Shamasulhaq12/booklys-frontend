'use client';

import { Box, Button, Modal, Paper, Stack } from '@mui/material';
import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import JournalsTable from './components/JournalsTable';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import ModalHeader from '@/app/common/components/ModalHeader';
import AddEditJournalForm from './components/form/AddEditJournalForm';

function Journals() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };
  return (
    <Paper sx={{ borderRadius: '10px' }} className=" py-14 px-8">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className=" rounded-2xl ml-6"
          startIcon={<Add />}
          onClick={toggleAddModal}
        >
          Create new Journal instance
        </Button>
      </Stack>
      <JournalsTable />
      <Modal open={isAddModalOpen} onClose={toggleAddModal}>
        <Box sx={{ ...formModalStyles, width: '900px' }}>
          <ModalHeader title="Journal instance" onClose={toggleAddModal} />
          <AddEditJournalForm toggleAddModal={toggleAddModal} />
        </Box>
      </Modal>
    </Paper>
  );
}

export default Journals;
