import React, { useRef, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { grey, orange } from '../constants/color';
import { InputBox } from '../components/styles/StyledComponents';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import FileMenu from '../components/dialog/FileMenu';
import { samplemessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id: 'jbjdbsv',
  name: 'Gaja',
};

const Chat = () => {
  const containerRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(samplemessage);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      _id: Date.now().toString(),
      sender: user,
      content: message,
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing="border-box"
        padding="1rem"
        bgcolor={grey}
        flexGrow={1}
        sx={{ overflowX: 'hidden', overflowY: 'auto' }}
      >
        {messages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form
        onSubmit={handleSendMessage}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem',
          borderTop: '1px solid #ccc',
          backgroundColor: 'white',
        }}
      >
        <Stack direction="row" height="100%" width="100%" alignItems="center">
          <IconButton sx={{ left: '1.5rem' }}>
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              flexGrow: 1,
              height: '3rem',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              fontSize: '1rem',
            }}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: 'white',
              marginLeft: '1rem',
              padding: '0.5rem',
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
