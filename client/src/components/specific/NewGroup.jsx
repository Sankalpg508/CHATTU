import React, { useState } from "react";
import { 
  Button, Dialog, DialogTitle, Stack, 
  TextField, Typography, Alert, Snackbar
} from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = ({ open = true, onClose }) => {
  const { value: groupName, changeHandler: handleGroupNameChange } = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  // Toggle function for selecting/deselecting users
  const selectMemberHandler = (id) => {
    // Update the isAdded property in members array
    setMembers(prev => 
      prev.map(user => 
        user._id === id ? { ...user, isAdded: !user.isAdded } : user
      )
    );
    
    // Update the selectedMembers array
    setSelectedMembers(prev =>
      prev.includes(id) 
        ? prev.filter(memberId => memberId !== id) 
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.trim()) {
      setError("Group name cannot be empty!");
      setShowError(true);
      return;
    }

    if (selectedMembers.length === 0) {
      setError("Please select at least one friend to add to the group");
      setShowError(true);
      return;
    }
    
    console.log("Creating Group with:", { 
      groupName, 
      selectedMembers,
      selectedUsers: members.filter(user => selectedMembers.includes(user._id))
    });
    
    // Close dialog and reset form
    handleClose();
  };

  const handleClose = () => {
    // Reset form state
    handleGroupNameChange({ target: { value: "" } });
    setSelectedMembers([]);
    setMembers(prev => prev.map(user => ({ ...user, isAdded: false })));
    setError("");
    setShowError(false);
    
    // Call the onClose prop if provided
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleErrorClose = () => {
    setShowError(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Stack p={{ xs: 2, sm: 3 }} width="25rem" spacing={3}>
          <DialogTitle textAlign="center" variant="h4">
            New Group
          </DialogTitle>
          
          <TextField 
            label="Group Name" 
            value={groupName} 
            onChange={handleGroupNameChange} 
            fullWidth
          />

          <Typography variant="body1">
            Members {selectedMembers.length > 0 && `(${selectedMembers.length} selected)`}
          </Typography>
          
          {members.length === 0 ? (
            <Alert severity="info">You don't have any friends to add to this group.</Alert>
          ) : (
            <Stack spacing={1} sx={{ maxHeight: "300px", overflow: "auto" }}>
              {members.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))}
            </Stack>
          )}

          <Stack direction="row" justifyContent="space-between">
            <Button 
              variant="outlined" 
              color="error" 
              size="large"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              size="large" 
              onClick={submitHandler} 
              disabled={members.length === 0}
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Dialog>

      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewGroup;