import React from 'react'
import Title from '../shared/Title'
import Header from './Header'
import { Grid2 } from '@mui/material'
import ChatList from '../specific/ChatList'
import { samplechats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
// import { SportsRugbySharp } from '@mui/icons-material'
const AppLayout = () => (WrappedComponent) => {


  return(props) =>  {
    const params = useParams();
    const chatId = params.chatId;
    const handleDeleteChat = (e,_id,groupChat) =>{
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
      
    }
    return(
    <>
     <Title/>
     <Header />
     
        
     <Grid2 
  container 
  height={'calc(100vh - 4rem)'} 
  display={'flex'}
  justifyContent={'space-between'}
>
  {/* Left sidebar */}
  <Grid2 
    item 
    sm={4} 
    md={3} 
    sx={{
      display: {xs: 'none', sm: 'block'},
      height: '100%'
    }}
  >
    <ChatList 
      chats={samplechats} 
      chatId={chatId}
      handleDeleteChat={handleDeleteChat}
    />
  </Grid2>

  {/* Main content area */}
  <Grid2 
  item 
  xs={12} 
  sm={8} 
  lg={6} 
  sx={{
    height: '100%',
    flexGrow: 1,
    display: 'flex', // Corrected syntax
    flexDirection: 'column', // Corrected property name
  }}
>

    <WrappedComponent {...props} />
  </Grid2>

  {/* Right sidebar */}
  <Grid2 
    item 
    md={4}
    lg={3}
    sx={{
      height: '100%',
      display: {xs:'none', md: 'block'},
      padding: '2rem',
      bgcolor: 'rgba(0,0,0,0.85)',
      alignItems: 'start'
    }}
  >
    <Profile/>
  </Grid2>
</Grid2>

      </>
    )
  }
}

export default AppLayout