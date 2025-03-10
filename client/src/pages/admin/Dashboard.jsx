import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { 
  Container, 
  Paper, 
  Stack, 
  InputBase, 
  Button, 
  Typography,
  IconButton,
  Box,
  alpha
} from '@mui/material'
import { 
  AdminPanelSettings as AdminPanelSettingsIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon  
} from '@mui/icons-material'
import moment from 'moment'
import { LineCharts, DoughnutCharts } from '../../components/specific/Charts'

const Dashboard = () => {
  const Appbar = (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: '1.5rem', 
        margin: '2rem 0', 
        borderRadius: '1rem'
      }}
    >
      <Stack 
        direction={'row'} 
        spacing={'1rem'} 
        alignItems={'center'}
        justifyContent={'space-between'}
      >    
        <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
          <AdminPanelSettingsIcon sx={{ fontSize: '2.5rem', color: 'primary.main' }}/>
          <Typography variant="h6" fontWeight="bold">Admin Dashboard</Typography>
          <Box flexGrow={1} />
          <Typography>{moment().format('MMMM Do YYYY')}</Typography>
        </Stack>
        
        <Stack 
          direction={'row'} 
          spacing={'1rem'} 
          alignItems={'center'}
        >
          <Paper
            component="form"
            sx={{ 
              p: '0.25rem 0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              width: { xs: 120, sm: 200, md: 300 },
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '2rem'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search dashboard' }}
            />
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: '2rem',
              textTransform: 'none',
              px: 3
            }}
          >
            Search
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )

  return (
    <AdminLayout>
      <Container component={'main'} maxWidth="xl">
        {Appbar}
        
        {/* Statistics Cards */}
        <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
          {[
            { name: 'Users', icon: <PersonIcon sx={{ fontSize: 40 }} />, color: '#4caf50' },
            { name: 'Messages', icon: <MessageIcon sx={{ fontSize: 40 }} />, color: '#2196f3' },
            { name: 'Chats', icon: <GroupIcon sx={{ fontSize: 40 }} />, color: '#ff9800' }
          ].map((item) => (
            <Paper
              key={item.name}
              elevation={2}
              sx={{
                p: 3,
                borderRadius: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 180,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                  bgcolor: alpha('#000', 0.02)
                }
              }}
            >
              {item.icon}
              <Typography variant="h4" fontWeight="bold" sx={{ color: item.color, mt: 1 }}>0</Typography>
              <Typography variant="h6" color="text.secondary">{item.name}</Typography>
            </Paper>
          ))}
        </Box>
        
        {/* Main Content Area */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 4 }}>
          {/* Last Messages Section */}
          <Paper 
            elevation={3} 
            sx={{
              padding: '2rem',
              borderRadius: '1rem',
              flexGrow: 1,
              width: '100%',
              minHeight: '400px'
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Last Messages</Typography>
            
            {/* Message placeholders */}
            <LineCharts value={[1,23,56,89,12,20]}/>

            {[1, 2, 3].map((item) => (
              <Paper
                key={item}
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <DoughnutCharts labels={['Single Chats', 'Group Chats']} value ={[23,56]}/>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <PersonIcon sx={{ color: 'white' }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium">User {item}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    This is a sample message content. Click to view full details.
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                  {moment().subtract(item, 'hour').format('h:mm A')}
                </Typography>
              </Paper>
            ))}
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button 
                variant="outlined" 
                endIcon={<ExitToAppIcon />}
                sx={{ borderRadius: '2rem', textTransform: 'none' }}
              >
                View All Messages
              </Button>
            </Box>
          </Paper>
          {/* Chart Section */}
          <Paper 
            elevation={3} 
            sx={{
              padding: '2rem',
              borderRadius: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', lg: '40%' },
              minHeight: '400px'
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>User Activity</Typography>
            
            {/* Placeholder for chart */}
            <Box
              sx={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                position: 'relative',
                background: 'conic-gradient(#4caf50 0% 25%, #2196f3 25% 55%, #ff9800 55% 75%, #f44336 75% 100%)',
                mb: 3
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h5" fontWeight="bold">100%</Typography>
              </Box>
            </Box>
            
            {/* Legend */}
            <Stack spacing={1} sx={{ width: '100%' }}>
              {[
                { label: 'Active', color: '#4caf50' },
                { label: 'Inactive', color: '#2196f3' },
                { label: 'New', color: '#ff9800' },
                { label: 'Blocked', color: '#f44336' }
              ].map((item) => (
                <Stack 
                  key={item.label}
                  direction="row" 
                  spacing={1} 
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '4px',
                      bgcolor: item.color
                    }}
                  />
                  <Typography variant="body2">{item.label}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </AdminLayout>
  )
}

export default Dashboard