// import React, { useState } from 'react';
// import { Container, Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages([...messages, { text: input, sender: 'user' }]);
//       setInput('');

//       // Simulate a response from the "AI"
//       setTimeout(() => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: 'This is a dummy response.', sender: 'ai' },
//         ]);
//       }, 1000);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, height: '70vh', overflowY: 'auto' }}>
//         <List>
//           {messages.map((message, index) => (
//             <ListItem key={index} alignItems="flex-start">
//               <ListItemText
//                 primary={
//                   <Typography
//                     variant="body1"
//                     color={message.sender === 'user' ? 'primary' : 'textSecondary'}
//                     sx={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}
//                   >
//                     {message.text}
//                   </Typography>
//                 }
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//       <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ ml: 2 }}
//           onClick={handleSend}
//           endIcon={<SendIcon />}
//         >
//           Send
//         </Button>
//       </Box>
//     </Container>
//   );
// }

// export default App;





import React, { useState } from 'react';
import { Container, Box, TextField, Button, List, ListItem, ListItemText, Typography, Drawer, AppBar, Toolbar, IconButton, CssBaseline } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([["Welcome to Tanzania Law Guide", "This is the beginning of your legal journey!"]]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      const updatedMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(updatedMessages);
      setInput('');

      // Simulate a response from the "AI"
      setTimeout(() => {
        const response = { text: 'This is a dummy response.', sender: 'ai' };
        const newMessages = [...updatedMessages, response];
        setMessages(newMessages);
        const updatedHistory = [...history];
        updatedHistory[currentChatIndex] = newMessages;
        setHistory(updatedHistory);
      }, 1000);
    }
  };

  const handleHistoryClick = (index) => {
    setMessages(history[index]);
    setCurrentChatIndex(index);
    setDrawerOpen(false);
  };

  const startNewConversation = () => {
    const newHistory = [...history, []];
    setHistory(newHistory);
    setMessages([]);
    setCurrentChatIndex(newHistory.length - 1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Tanzania Law Guide
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {history.map((_, index) => (
              <ListItem button key={index} onClick={() => handleHistoryClick(index)}>
                <ListItemText primary={`Conversation ${index + 1}`} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" onClick={startNewConversation} sx={{ m: 2 }}>
            Start New Conversation
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, height: '60vh', overflowY: 'auto' }}>
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
      </Box>
    </Box>
  );
}

export default App;
