import React from 'react';
import { Stack } from '@mui/material';
import ChatItem from '../shared/ChatItem';
import { bgGradient } from '../../constants/color';
const ChatList = ({
  w = '100%',
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={'column'} overflow={'auto'} height={'100%'}
    sx={{backgroundImage: bgGradient}}
    >
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
        
        const newMessageAlert = newMessagesAlert.find(
          (alert) => alert.chatId === _id
        );

        const isOnline = members?.some((member) => onlineUsers.includes(member));

        return (
          <ChatItem
            key={_id}
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat} 
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
