import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import { getBoxWrapperStyles, getSidebarWrapperStyles } from '@/styles/mui/containers/layout/layout-styles';
import Topbar from '../common/Topbar';

function PrivateLayoutWrapper({ children }) {
  const isSmallDevice = useMediaQuery('@media screen and (max-width: 768px)');

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    if (!isSmallDevice) {
      setSidebarCollapsed(false);
    } else {
      setSidebarCollapsed(true);
    }
  }, [isSmallDevice]);

  // CONSTANTS
  const drawerWidth = '200px';
  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Topbar toggleSidebar={toggleSidebarCollapse} isPortal />

      <Box sx={getSidebarWrapperStyles(isSidebarCollapsed, drawerWidth)}>
        <Sidebar collapse={isSidebarCollapsed} />
      </Box>

      <Box sx={getBoxWrapperStyles(isSidebarCollapsed, drawerWidth)}>{children}</Box>
    </Box>
  );
}

PrivateLayoutWrapper.propTypes = {
  children: PropTypes.node,
};

export default PrivateLayoutWrapper;
