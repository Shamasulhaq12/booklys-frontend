import React from 'react';
import propTypes from 'prop-types';
import Footer from './components/Footer';
import Topbar from '../common/Topbar';

function PublicLayoutWrapper({ children }) {
  return (
    <>
      <Topbar />
      {children}
      <Footer />
    </>
  );
}

PublicLayoutWrapper.propTypes = {
  children: propTypes.node,
};

export default PublicLayoutWrapper;
