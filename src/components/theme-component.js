import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../media/favicon-32x32.png';
import mainBackground from '../media/main-image.jpg';

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

export default function MainComponent({ component: Component }) {

  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const fontSize = matches ? '4rem' : '2rem';

  const letterStyles = {
    color:"#F2E8DC"
  }

  const images = [
    {
      id: 1,
      src: `url(${mainBackground})`,
      alt: 'Image 1',
    },
    {
      id: 2,
      src: `url(${mainBackground})`,
      alt: 'Image 2',
    },
    {
      id: 3,
      src: `url(${mainBackground})`,
      alt: 'Image 3',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <img src={logo} alt="logo" />
          <Typography variant="h6" color="inherit" noWrap margin="20px">
            Welcome to Chikki Aquatics!
          </Typography>
        </Toolbar>
      </AppBar>
        <Box
          sx={{
            bgcolor: 'background.paper',
            backgroundImage: `url(${mainBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom 250px',
            width: '90vw',
            height: '40vh',
            pt: 10,
            backgroundAttachment: 'fixed',
          }}
        >
                <Container maxWidth="70%">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="white text.primary"
                gutterBottom
                sx={{ 
                  fontSize: '6rem',
                  position: 'relative',
                 }}
                style={{fontSize, ...letterStyles}}
              >
                Chikki Aquatics
              </Typography>
              <Typography variant="h5" 
                align="center" color="white text.secondary" paragraph 
                sx={{ fontSize: '2rem', position: 'relative', ...letterStyles }}>
                We love goldfish and we want to share our passion with you.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
              </Stack>
          </Container>
        </Box>
          
      {/* Display component could be replaced in here */}
      <Component />
      <Box sx={{ bgcolor: '#0077be', p: 6}} component="footer">
        <Footer />
      </Box>
    </ThemeProvider>
  );
}