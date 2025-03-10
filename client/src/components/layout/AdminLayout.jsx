import { Box, Drawer, Grid2, IconButton, Stack, styled, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { grey, matBlack } from '../../constants/color'
import { Menu as MenuIcon, Close as CloseIcon, ManageAccounts as ManageAccountsIcon, Dashboard as DashboardIcon, Groups as GroupsIcon, Message as MessageIcon, ExitToApp as ExitToAppIcon,  } from '@mui/icons-material'
import {  useLocation, Link as LinkComponent, Navigate } from 'react-router-dom'
const Link = styled(LinkComponent)`
    text-decoration: none;
    color: inherit;
    border-radius: 2rem;
    padding: 1rem 2rem;
    &:hover {
        color: rgba(0, 0, 0, 0.54);
    }
`
const adminTabs = [{
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon />,
    },
    
{
    name: 'Users',
    path: '/admin/users',
    icon: <ManageAccountsIcon />,
    },
    
{
    name: 'Chats',
    path: '/admin/chats',
    icon: <GroupsIcon />,
    },
    
{
    name: 'Messages',
    path: '/admin/messages',
    icon: <MessageIcon />,
    },
    ]

const Sidebar = ({ w = '100%' }) => {
    const location = useLocation();
    const logoutHandler = () => {
        console.log('logging out')
    }

    return (
        <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
            <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>CHATTU</Typography>
            <Stack spacing={'1rem'}>
{
    adminTabs.map((tab) => (
        <Link to={tab.path} key={tab.path} 
        sx={
            location.pathname === tab.path && {
                bgcolor: matBlack,
                color: 'white',
            ":hover": {
                color: "white",
            }
        }
        }>
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                {tab.icon}
                <Typography fontSize={'1.2rem'}
                variant={'h6'}
                sx={{
                    color: location.pathname === tab.path ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === tab.path ? 'bold' : 'normal',
                }}
            >
                {tab.name}
            </Typography>
            </Stack>
            
        </Link>
    ))
}
<Link  onClick={logoutHandler}
        
        >
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                <ExitToAppIcon/>
                <Typography fontSize={'1.2rem'} 
                variant={'h6'}
              
            >
                Logout
            </Typography>
            </Stack>
            
        </Link>

            </Stack>
        </Stack>
    )
}
const isAdmin = true;

const AdminLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 900) {
                setIsMobile(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMobile = () => {
        setIsMobile(!isMobile);
    };
    if(!isAdmin) return <Navigate to='/admin' />

    return (
        <Grid2 container minHeight={"100vh"} spacing={2}>
            {/* Mobile Sidebar Toggle Button */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, right: '1rem', top: '1rem', position: 'fixed' }}>
                <IconButton onClick={handleMobile}>
                    {isMobile ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            </Box>

            {/* Sidebar for Larger Screens */}
            <Grid2 item xs={12} md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' },  }}>
                <Sidebar />
            </Grid2>

            {/* Main Content Area */}
            <Grid2 item xs={12} md={8} lg={9} sx={{ bgcolor: grey, p: 2 }}>
                {children}
            </Grid2>

            {/* Mobile Sidebar Drawer */}
            <Drawer open={isMobile} onClose={() => setIsMobile(false)}>
                <Sidebar w='70vw' />
            </Drawer>
        </Grid2>
    )
}

export default AdminLayout;
