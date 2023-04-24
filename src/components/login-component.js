import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import logo from '../media/favicon-32x32.png';
import Toolbar from '@mui/material/Toolbar';
import { getUser } from '../api/client';
import { useDispatch } from 'react-redux'
import { updateToken } from '../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
export default function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await getUser({email, password})
    if (user.status === 200) {
      dispatch(updateToken(user.data))
      navigate("/sellerdashboard")
    } else {
      alert("Error during login")
    }
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
      <Container component="main" maxWidth="70%">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, backgroundColor: 'white' }} padding={0.5} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2" sx={{color:'black'}}>
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                {/* <Link href="/signup" variant="body2" sx={{color:'black'}}>
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}