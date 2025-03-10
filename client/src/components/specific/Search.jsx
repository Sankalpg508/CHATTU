import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';

const Search = () => {
  const { value: searchValue, changeHandler: handleSearchChange } = useInputValidation("");
  
  const [users] = useState(sampleUsers);
  const isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    if (!id) return;
    console.log("Sending friend request to:", id);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Dialog open>
      <Stack padding="2rem" direction="column" width="25rem">
        <DialogTitle textAlign="center">Find People</DialogTitle>

        {/* Search Input */}
        <TextField 
          label="Search People"
          value={searchValue}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        {/* Users List */}
        <List>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserItem 
                user={user} 
                key={user._id}
                handler={() => addFriendHandler(user._id)}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          ) : (
            <Typography textAlign="center" mt={2} variant="body2">
              No users found.
            </Typography>
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
