import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography, keyframes } from '@mui/material';
import React, { Suspense, useState, lazy, useEffect } from 'react';
import {
  Logout as LogoutIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup'));

// Color palette
const palette = {
  'navy': '#001524',
  'blue': '#15616d',
  'cream': '#ffecd1',
  'orange': '#ff7d00',
  'maroon': '#78290f',
};

// Define keyframes for animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

const badgePulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 125, 0, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(255, 125, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 125, 0, 0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const slideRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shrinkHeader = keyframes`
  from { padding: 8px 0; }
  to { padding: 4px 0; }
`;

function Header() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobile = () => setIsMobile((prev) => !prev);
  const toggleSearch = () => setIsSearch((prev) => !prev);
  const toggleNewGroup = () => setIsNewGroup((prev) => !prev);
  const toggleNotification = () => setIsNotification((prev) => !prev);
  
  const logoutHandler = () => console.log('logout');
  const navigateToGroup = () => navigate('/groups');

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar 
          position="fixed" 
          sx={{ 
            bgcolor: scrolled ? palette.navy : palette.blue,
            transition: 'background-color 0.3s ease-in-out',
            boxShadow: scrolled ? 3 : 0,
            animation: scrolled ? `${shrinkHeader} 0.3s forwards` : 'none'
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                color: palette.cream,
                fontWeight: 'bold',
                letterSpacing: '1px',
                textShadow: `0 2px 4px rgba(0,0,0,0.2)`,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: 2,
                  backgroundColor: palette.orange,
                  transition: 'width 0.3s ease-in-out'
                },
                '&:hover::after': {
                  width: '100%'
                }
              }}
            >
              Chattu
            </Typography>

            {/* Mobile menu icon */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton 
                color="inherit" 
                onClick={handleMobile}
                sx={{ 
                  color: palette.cream,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(90deg)'
                  }
                }}
              >
                {isMobile ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Mobile menu panel */}
            {isMobile && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: '4rem', 
                  left: 0, 
                  right: 0, 
                  bgcolor: palette.navy,
                  display: { xs: 'flex', sm: 'none' },
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem 0',
                  animation: `${slideDown} 0.3s ease-in-out`,
                  transformOrigin: 'top center',
                  zIndex: 1000
                }}
              >
                <MobileMenuItem title="Search" icon={<SearchIcon />} onClick={toggleSearch} delay={0.05} />
                <MobileMenuItem title="New Group" icon={<AddIcon />} onClick={toggleNewGroup} delay={0.1} />
                <MobileMenuItem title="Manage Groups" icon={<GroupIcon />} onClick={navigateToGroup} delay={0.15} />
                <MobileMenuItem title="Notifications" icon={<NotificationsIcon />} onClick={toggleNotification} delay={0.2} />
                <MobileMenuItem title="Logout" icon={<LogoutIcon />} onClick={logoutHandler} delay={0.25} />
              </Box>
            )}

            {/* Desktop icons */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <IconBtn 
                title="Search" 
                icon={<SearchIcon />} 
                onClick={toggleSearch} 
                active={isSearch}
                color={palette.cream}
              />
              <IconBtn 
                title="New Group" 
                icon={<AddIcon />} 
                onClick={toggleNewGroup} 
                active={isNewGroup}
                color={palette.cream}
              />
              <IconBtn 
                title="Manage Groups" 
                icon={<GroupIcon />} 
                onClick={navigateToGroup}
                color={palette.cream} 
              />
              <IconBtn 
                title="Notifications" 
                icon={<NotificationsIcon />} 
                onClick={toggleNotification} 
                active={isNotification}
                color={palette.cream}
                badgeContent={3}
                badgeColor={palette.orange}
              />
              <IconBtn 
                title="Logout" 
                icon={<LogoutIcon />} 
                onClick={logoutHandler}
                color={palette.cream} 
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Modal content with Suspense */}
      {isSearch && (
        <Suspense fallback={<AnimatedBackdrop />}>
          <SearchDialog onClose={toggleSearch} />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<AnimatedBackdrop />}>
          <NotificationDialog onClose={toggleNotification} />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<AnimatedBackdrop />}>
          <NewGroupDialog onClose={toggleNewGroup} />
        </Suspense>
      )}
    </>
  );
}

// Enhanced IconButton with animation and active state
const IconBtn = ({ title, icon, onClick, active, color, badgeContent, badgeColor }) => (
  <Tooltip title={title}>
    <Box sx={{ position: 'relative' }}>
      <IconButton 
        color="inherit" 
        size="large" 
        onClick={onClick}
        sx={{ 
          color: color,
          transition: 'transform 0.2s, background-color 0.3s',
          '&:hover': { 
            backgroundColor: 'rgba(255,255,255,0.1)',
            transform: 'translateY(-2px)'
          },
          '&:active': {
            animation: `${pulse} 0.3s ease-in-out`
          },
          ...(active && {
            backgroundColor: 'rgba(255,255,255,0.2)',
          })
        }}
      >
        {icon}
      </IconButton>
      {badgeContent && (
        <Box
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            backgroundColor: badgeColor || palette.orange,
            color: '#fff',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            animation: `${badgePulse} 2s infinite`
          }}
        >
          {badgeContent}
        </Box>
      )}
    </Box>
  </Tooltip>
);

// Mobile menu item component
const MobileMenuItem = ({ title, icon, onClick, delay }) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '0.75rem 2rem',
      color: palette.cream,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: palette.blue
      },
      transition: 'background-color 0.2s',
      animation: `${slideRight} 0.3s ease-in-out both`,
      animationDelay: `${delay}s`
    }}
  >
    <Box sx={{ mr: 2 }}>{icon}</Box>
    <Typography>{title}</Typography>
  </Box>
);

// Animated backdrop for Suspense fallback
const AnimatedBackdrop = () => (
  <Backdrop 
    open 
    sx={{ 
      backgroundColor: 'rgba(0, 21, 36, 0.7)',
      zIndex: (theme) => theme.zIndex.drawer + 1,
      animation: `${fadeIn} 0.3s ease-in-out`
    }}
  >
    <Box 
      sx={{ 
        width: 60, 
        height: 60, 
        borderRadius: '50%',
        border: `4px solid ${palette.cream}`,
        borderTop: `4px solid ${palette.orange}`,
        animation: `${spin} 1s linear infinite`
      }}
    />
  </Backdrop>
);

export default Header;