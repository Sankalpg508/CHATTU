import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalendarIcon } from '@mui/icons-material';
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          marginBottom: '1rem',
          border: '5px solid white',
        }}
      />
      <ProfileCard heading="Bio" text="Admin" />
      

      <div>
        <Stack spacing={2}>

  <ProfileCard heading="Username" text="sankalp.sagar.10" Icon={UserNameIcon} style={{ marginBottom: '1rem' }} />
  <ProfileCard heading="Name" text="Sankalp Sagar" Icon={FaceIcon} style={{ marginBottom: '1rem' }} />
  <ProfileCard heading="Joined" text={moment().format("MMMM Do, YYYY")} Icon={CalendarIcon} />
        </Stack>
</div>

    
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack direction="row" alignItems="center" spacing="1rem" color="white" textAlign="center">
    {Icon && <Icon />} 
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color="grey" variant="caption">{heading}</Typography>
    </Stack>
  </Stack>
);

export default Profile;
