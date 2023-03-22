import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getFish, buyFish } from '../api/client'; 
import images from '../media/images';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../media/favicon-32x32.png';

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

export default function MainComponent() {
  const [fish, setFish] = React.useState([]);
  React.useEffect(() => {
    getFish().then((fish) => {
      setFish(fish);
    });
  }, []);

  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const fontSize = matches ? '4rem' : '2rem';

  const onBuyClick = (id) => {
    buyFish(id).then((response) => {
      if (response.status === 200) {
        window.location.reload()
      }
    });
  };
  
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
            backgroundImage: `url(${images.mainBackground})`,
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
                style={{fontSize}}
              >
                Chikki Aquatics
              </Typography>
              <Typography variant="h5" 
                align="center" color="white text.secondary" paragraph 
                sx={{ fontSize: '2rem', position: 'relative' }}>
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
      
        <p>Live Stream section available 7PM Central time daily</p>
        <p>Our available selection</p>
        <Container sx={{ py: 8 }} maxWidth="30%">
          <Grid container spacing={4}>
            {fish.map((fishItem) => (
              <Grid item key={fishItem.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image={fishItem.image_source}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ 
                  fontSize: '2rem'}}>
                      {fishItem.fish_name}
                      <br/>
                      {fishItem.price}
                    </Typography>
                    <Typography sx={{ 
                  fontSize: '1rem'}}>
                      {fishItem.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {fishItem.bought ? 
                    <Button size="medium"
                            color='primary'
                            style={{ backgroundColor: '#ADD8E6' }}
                            disabled={true}>
                              <Typography color="red" >Sold Out</Typography></Button> : <Button size="large" 
                            color='primary'
                            type='submit'
                            onClick={() => onBuyClick(fishItem.id)}
                            style={{ backgroundColor: '#ADD8E6' }}>Buy</Button>}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Footer />
      </Box>
    </ThemeProvider>
  );
}