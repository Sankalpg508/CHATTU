import { Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Backdrop, Box, Button, Drawer, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { bgGradient, matBlack } from '../constants/color';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AvatarCard from '../components/shared/AvatarCard';
import { samplechats, sampleUsers } from '../constants/sampleData';
import { Grid2 } from '@mui/material';
import UserItem from '../components/shared/UserItem'; // Ensure UserItem is imported

const ConfirmDeleteDialog = lazy(() => import('../components/dialog/ConfirmDeletDialog'));
const AddMemberDialog = lazy(() => import('../components/dialog/AddMemberDialog')); 

const Groups = () => {
  const chatId = useSearchParams()[0].get('group');
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [confirmAddMemberDialog, setConfirmAddMemberDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState(sampleUsers); // State to manage group members

  // Function to handle member removal
  const handleRemoveMember = (memberId) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member._id !== memberId));
  };

 // Function to handle member addition
const addMemberHandler = (membersToAdd) => {
  // Filter out members that are already in the group
  const existingMemberIds = members.map(member => member._id);
  const newMemberIds = membersToAdd.filter(id => !existingMemberIds.includes(id));
  
  // Only proceed if there are new members to add
  if (newMemberIds.length > 0) {
    const newMembers = newMemberIds.map((id) => sampleUsers.find((user) => user._id === id));
    setMembers((prevMembers) => [...prevMembers, ...newMembers]);
  }
  
  closeAddMemberHandler();
};

  const deleteHandler = () => {
    console.log('Delete Member');
    closeConfirmDeleteHandler();
  };
  
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log('Delete Group');
  };
  
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  
  const openAddMemberHandler = () => {
    setConfirmAddMemberDialog(true);
    console.log('Add Member');
  };
  
  const closeAddMemberHandler = () => {
    setConfirmAddMemberDialog(false);
  };
  
  const actionButtons = (
    <Stack
      direction={{
        xs: 'column-reverse',
        sm: 'row',
      }}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={'1rem'}
      p={{
        xs: 0,
        sm: '2rem',
        md: '1rem 4rem'
      }}>
      <Button size='large' color='error' startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size='large' variant='contained' startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add Member</Button>
    </Stack>
  );
  
  const updateGroupName = () => {
    setIsEdit(false);
    setGroupName(groupNameUpdatedValue);
    console.log(groupNameUpdatedValue);
  };
  
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
      return () => {
        setGroupName('');
        setGroupNameUpdatedValue('');
        setIsEdit(false);
      };
    }
  }, [chatId]);
  
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navigateBack = () => {
    navigate('/');
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          right: '1rem',
          top: '1rem',
        }}
      >
        <Tooltip title="Menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            color: 'white',
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: matBlack,
            ':hover': { bgcolor: bgGradient },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  
  const GroupName = (
    <Stack 
      direction={'row'} 
      alignItems={'center'} 
      justifyContent={'center'} 
      spacing={"1rem"} 
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField 
            label="Group Name" 
            variant="outlined" 
            size="small"  
            value={groupNameUpdatedValue} 
            onChange={e => setGroupNameUpdatedValue(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={updateGroupName}
          >
            <DoneIcon />
          </Button>
        </>
      ) : ( 
        <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
  
  return (
    <Grid2 container height="100vh">
      <Grid2 item sx={{ display: { xs: 'none', sm: 'block', backgroundImage: bgGradient} }} sm={5} >
        <GroupList myGroups={samplechats} chatId={chatId} />
      </Grid2>
      
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open={true} />}>
          <ConfirmDeleteDialog 
            open={confirmDeleteDialog} 
            onClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      {confirmAddMemberDialog && (
        <Suspense fallback={<Backdrop open={true} />}>
          <AddMemberDialog 
            open={confirmAddMemberDialog} 
            onClose={closeAddMemberHandler} 
            addMember={addMemberHandler}  
            isLoadingMember={false}       
            chatId={chatId} 
          />
        </Suspense> 
      )}

      <Drawer 
        sx={{ display: { xs: 'block', sm: 'none' } }} 
        open={isMobileMenuOpen} 
        onClose={handleMobileClose}
        
      >
        <GroupList w={'50vw'} myGroups={samplechats} chatId={chatId} />
      </Drawer>

      <Grid2
        item
        xs={12}
        sm={7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
        {IconBtns}
        
        {groupName && (
          <>
            {GroupName}
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              Members
            </Typography>
            <Stack spacing={2} sx={{ width: '100%', padding: '1rem', backgroundColor: 'beige' }}>
              {members.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  onAction={handleRemoveMember} // Pass the remove handler
                  styling={{
                    boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                    borderRadius: '1rem',
                    padding: '1rem 2rem',
                  }}
                  isAdded={true} 
                />
              ))}
            </Stack>
            {actionButtons}
          </>
        )}
      </Grid2>
    </Grid2>
  );
};

const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack spacing={2} sx={{ width: w, padding: '1rem', backgroundImage:{bgGradient}, height: '100vh', overflowY: 'auto' }}>
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItems key={group._id} group={group} chatId={chatId} />
        ))
      ) : (
        <Typography 
          textAlign={'center'} 
          padding="1rem" 
          variant="h6" 
          sx={{ color: 'text.secondary' }}
        >
          You are not in any groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItems = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link 
      to={`?group=${_id}`} 
      onClick={e => { if(chatId === _id) e.preventDefault() }}
      style={{ textDecoration: 'none' }}

    >
      <Stack 
        direction={'row'} 
        alignItems={'center'} 
        spacing={2} 
        sx={{ 
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '4px',
          ':hover': { bgcolor: 'rgba(0,0,0,0.05)' },
          bgcolor: chatId === _id ? 'rgba(0,0,0,0.1)' : 'transparent'
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography sx={{color: 'text.primary'}}>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;