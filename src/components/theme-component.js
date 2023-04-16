import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../media/favicon-32x32.png';
import mainBackground from '../media/main-image.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Slide } from 'react-slideshow-image';

import { IconButton } from '@mui/material';
import 'react-slideshow-image/dist/styles.css'
import { useNavigate } from 'react-router-dom';

function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <span>
            Contact us
            <br/>
            Email: chikkiaquatics@gmail.com
      </span>
    </Typography>
  );
}

const theme = createTheme();
const backgroundImages = [mainBackground, mainBackground, mainBackground]

export default function MainComponent({ component: Component }) {
  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate("/login")
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <img src={logo} alt="logo" />
          <Typography variant="h6" color="inherit" noWrap margin="20px">
            Welcome to Chikki Aquatics!
          </Typography>
          <Box display="flex" justifyContent="flex-end" sx={{right:50}} position='absolute'>
            <IconButton onClick={() => handleIconClick()} sx={{color: "white"}}>
              <AccountCircleIcon fontSize='large' sx={{right:0}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
        <Box
          sx={{
            width: '95%',
          }}
        >
            <Slide>
              {backgroundImages.map((image, index) => 
                <div key={index}className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${image})` }}> 
                        <span>Slide 1</span>
                    </div>
                </div>)}
            </Slide>
        </Box>
          
      {/* Display component could be replaced in here */}
      <Component />
      <Box sx={{ bgcolor: '#0077be', p: 6, width: '100%'}} component="footer">
        <Footer />
      </Box>
    </ThemeProvider>
  );
}