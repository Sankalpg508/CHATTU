import { memo } from 'react';
import React from 'react';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

const UserItem = ({ user, onAction, isAdded, styling = {} }) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem sx={styling}>
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'}>
        <Avatar src={avatar} />
        <Typography
          variant='body1'
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {name}
        </Typography>
        <IconButton
          size='small'
          sx={{
            bgcolor: isAdded ? 'error.main' : 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: isAdded ? 'error.dark' : 'primary.dark',
            },
          }}
          onClick={() => onAction(_id)}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

// Default props to avoid errors if props are not provided
UserItem.defaultProps = {
  onAction: () => console.warn('Action handler not provided'),
  isAdded: false,
  styling: {} // Default empty styling
};

export default memo(UserItem);