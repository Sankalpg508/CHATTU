import { Dialog, DialogTitle, DialogContent, DialogContentText, Stack, CircularProgress, Typography, Button, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';

const AddMemberDialog = ({ addMember, isLoadingMember, chatId, open, onClose }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showError, setShowError] = useState(false); // State to control error message visibility

  const selectMemberHandler = (id) => {
    setMembers((prev) =>
      prev.map(user =>
        user._id === id ? { ...user, isAdded: !user.isAdded } : user
      )
    );
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    if (selectedMembers.length === 0) {
      setShowError(true); // Show error if no members are selected
      return;
    }

    if (!addMember || typeof addMember !== 'function') {
      console.error("❌ addMember function is not provided. Check Groups.jsx.");
      return;
    }

    addMember(selectedMembers); // Pass the selected members to the parent component
    onClose();
  };

  const closeHandler = () => {
    setShowError(false); // Reset error state on close
    onClose();
  };

  const handleErrorClose = () => {
    setShowError(false); // Close the error message
  };

  return (
    <>
      <Dialog open={open} onClose={closeHandler} fullWidth>
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent>
          <DialogContentText>Select a user to add</DialogContentText>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {isLoadingMember ? (
              <CircularProgress />
            ) : members.length > 0 ? (
              members.map((user) => (
                <UserItem
                  key={user._id}
                  onAction={() => selectMemberHandler(user._id)}
                  isAdded={selectedMembers.includes(user._id)}
                  user={user}
                />
              ))
            ) : (
              <Typography variant="body1">No users found</Typography>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }} justifyContent="space-evenly">
            <Button onClick={closeHandler} variant="outlined" color="error">Close</Button>
            <Button variant="contained" disabled={isLoadingMember} onClick={addMemberSubmitHandler}>
              Submit Changes
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Snackbar for error message */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          No users selected. Please select at least one user to add.
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddMemberDialog;