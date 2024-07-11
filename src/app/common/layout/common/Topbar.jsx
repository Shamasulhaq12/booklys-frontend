/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Image from 'next/image';

// STYLES & ASSETS
import styles from '@/styles/containers/layout/portal/topbar.module.scss';
import { statusOnline } from '@/styles/common/colors';
import logo from '@/assets/Booklyz.svg';

// CUSTOM HOOKS
import useGetMenuHandlers from '@/customHooks/useGetMenuHandlers';
import useGetUserRoles from '@/customHooks/useGetUserRoles';
import { topbarItems } from '../utilities/data';
import { AUTHENTICATED } from '@/utilities/constants';
import SearchInput from './SearchInput';
import NavLinkItem from './NavLinkItem';
import ProfileMenu from './ProfileMenu';
// import CategoryMenu from './CategoryMenu';
import Drawer from '../public-pages/components/Drawer';

// COMPONENTS & UTILITIES

function Topbar({ toggleSidebar = () => {}, isPortal = false }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { userType } = useGetUserRoles();
  const profileCompleted = user?.is_profile_completed;

  // STATE HOOKS
  const [showNavbar, setShowNavbar] = useState(false);
  const [type, setType] = useState('supplier');

  //   MENU HANDLERS
  const [topbarMenu, handleOpenMenu, handleCloseMenu] = useGetMenuHandlers();

  const [categoryMenu, handleOpenCategoryMenu, handleCloseCategoryMenu] = useGetMenuHandlers();

  const handleShowNavbar = () => setShowNavbar(!showNavbar);

  const modified = useMemo(() => {
    const filtered = topbarItems.filter(item => {
      if (isAuthenticated) {
        const isAllowed = item?.permissions?.includes(userType);
        return isAllowed;
      }
      const isAllowed = item?.permissions?.includes(AUTHENTICATED);
      return isAllowed;
    });
    return filtered;
  }, [userType, isAuthenticated]);

  const handleUserTypeChange = () => {
    if (type === 'client') {
      setType('supplier');
    } else {
      setType('client');
    }
  };

  return (
    <Box className={styles.topbarContainer}>
      {!isAuthenticated && profileCompleted && (
        <Box className={`${styles.navAlertColor} text-center py-3 px-3`}>
          <Typography variant="body2" className=" text-white font-semibold">
            Your account has been verified!{' '}
            <Link href="/portal/client/profile-setting">Please complete your profile.</Link>
          </Typography>
        </Box>
      )}
      <Box className={`flex items-center justify-between ${styles.topbar}`}>
        <Box className=" flex items-center gap-1 sm:gap-3">
          {isPortal && (
            <IconButton className=" flex md:hidden p-1" onClick={() => toggleSidebar()}>
              <Menu />
            </IconButton>
          )}

          <Stack direction="row" alignItems="center" gap={3}>
            <Box component={Link} href="/">
              <Image src={logo.src} alt="Logo" width={70} height={70} />
            </Box>
            {userType !== 'supplier' && (
              <Box className="hidden sm:hidden md:hidden lg:block">
                <SearchInput />
              </Box>
            )}
          </Stack>
        </Box>

        <Box className=" flex items-center gap-2">
          <Box className=" hidden xl:flex flex-grow items-center gap-1">
            {modified?.map(item => (
              <NavLinkItem
                label={item.title}
                menu={item?.menu}
                toggle={handleOpenCategoryMenu}
                path={item.path}
                key={item.path}
              />
            ))}
          </Box>
          {isAuthenticated ? (
            <Box className="flex items-center gap-3">
              <Button
                onClick={handleUserTypeChange}
                color="primary"
                variant="outlined"
                className="normal-case px-2 py-1 ms-1"
              >
                {type === 'supplier' ? 'View as Client' : 'View as Supplier'}
              </Button>
              {/* <Notifications /> */}
              <Box onClick={handleOpenMenu} className="flex items-center gap-2 cursor-pointer">
                <span className=" relative">
                  <Avatar src={user?.profile?.image || ''} />
                  <span
                    className={styles.working_status_indicator}
                    style={{ backgroundColor: statusOnline }}
                  />
                </span>
              </Box>
            </Box>
          ) : (
            <>
              <NavLinkItem
                label="Sign in"
                path="/auth/signin"
                navClassName={`no-underline hidden sm:block navbar-nav-item ${styles.navbarNavItemDark} `}
              />

              <Link href="/auth/signup" className=" no-underline hidden sm:block ">
                <Button color="primary" variant="contained" className="normal-case px-2 py-1 ms-1">
                  Sign up
                </Button>
              </Link>
            </>
          )}
          <Menu className="block xl:hidden cursor-pointer" onClick={handleShowNavbar} />
        </Box>

        <ProfileMenu anchorEl={topbarMenu} handleClose={handleCloseMenu} />
        {/* <CategoryMenu anchor={categoryMenu} toggle={handleCloseCategoryMenu} /> */}
        <Drawer key={showNavbar} showNavbar={showNavbar} handleShowNavbar={handleShowNavbar} />
      </Box>
    </Box>
  );
}
Topbar.propTypes = {
  toggleSidebar: propTypes.func,
  isPortal: propTypes.bool,
};

export default Topbar;
