import React, { useState } from 'react';
import { Container, Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      // Simulate a response from the "AI"
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a dummy response.', sender: 'ai' },
        ]);
      }, 1000);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, height: '70vh', overflowY: 'auto' }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    color={message.sender === 'user' ? 'primary' : 'textSecondary'}
                    sx={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}
                  >
                    {message.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={handleSend}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}

export default App;
