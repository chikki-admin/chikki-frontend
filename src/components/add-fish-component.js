import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SetMealIcon from '@mui/icons-material/SetMeal';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postFish } from '../api/client';
import { useSelector } from 'react-redux';

const AddFishForm = () => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user)
    const [fishPayload, setFishPayload] = React.useState({
        name: '',
        price: '',
        origin: '',
        s3Source: '',
        description: '',
        videoSource: '',
        imageSource: '',
        sellerId: user.userId,
        token: user.token
    });
    const onSubmitFishClick = async (event) => {
      if (fishPayload.name === '' || fishPayload.price === '' || fishPayload.s3Source === '') {
          alert('You are missing either name, price or s3Source');
          return
      }
      // post a fish
      let promises = []
      let fishImagePromise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fishPayload.s3Source);
        reader.onload = () => resolve(reader.result)
      })
      promises.push(fishImagePromise)
      if (fishPayload.videoSource) {
        let fishVideoPromise = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(fishPayload.videoSource);
          reader.onload = () => resolve(reader.result)
      })
      promises.push(fishVideoPromise)
      Promise.all(promises).then(fileContents => {
        fishPayload.s3Source = fileContents[0]
        fishPayload.videoSource = fileContents[1]
        postFish(fishPayload).then((response) => {
          if (response === 'OK') {
            setFishPayload({
              ...fishPayload,
              name: '',
              price: '',
              origin: '',
              s3Source: '',
              description: '',
              videoSource: '',
              imageSource: ''
            })
            navigate('/sellerdashboard');
          } else {
            alert('Something went wrong');}
        })
    });
    }
  }
    return (
        <Paper sx={{padding:2}}>
            <h2>Add Fish</h2>
            <TextField
                helperText="Please enter your name"
                id="demo-helper-text-aligned"
                label="Fish Name"
                fullWidth
                onChange={(e) => setFishPayload({...fishPayload, name: e.target.value})}
                value={fishPayload.name}
                required
                sx={{padding: 1}}
                />
            <TextField
                helperText="Please enter your price for fish"
                id="demo-helper-text-aligned"
                label="Fish Price"
                fullWidth
                onChange={(e) => setFishPayload({...fishPayload, price: e.target.value})}
                value={fishPayload.price}
                required
                type='number'
                sx={{padding: 1}}
                />
            <TextField
                helperText="Please enter your fish origin"
                id="demo-helper-text-aligned"
                label="Fish Origin"
                onChange={(e) => setFishPayload({...fishPayload, origin: e.target.value})}
                value={fishPayload.origin}
                fullWidth
                sx={{padding: 1}}
                />

            <TextField
                helperText="Please enter your fish swimming video"
                id="demo-helper-text-aligned"
                label="Fish Description"
                onChange={(e) => setFishPayload({...fishPayload, description: e.target.value})}
                value={fishPayload.description}
                fullWidth
                sx={{padding: 1}}
                />
            {fishPayload.imageSource ? <p> <CheckCircleOutlineIcon style={{ color: 'green' }}/> Image Selected</p> : null}
            {fishPayload.videoSource ? <p> <CheckCircleOutlineIcon style={{ color: 'green' }}/> Video Selected</p> : null}
            <Button
                variant="outlined"
                component="label"
                sx={{padding: 1}}
              >
                Upload Fish Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => 
                    setFishPayload({...fishPayload, s3Source: e.target.files[0], imageSource: e.target.value})}
                />
            </Button>
            <Button
                variant="outlined"
                component="label"
                sx={{padding: 1}}
              >
                Upload Fish Video
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    if (e.target.files[0].size> 1024 * 1024 * 2) {
                      alert('File size should be less than 2MB')
                    } else {
                      setFishPayload({...fishPayload, videoSource: e.target.files[0]})
                    }
                }}
                />
            </Button>
            <Button 
                variant="outlined"
                align="right"
                component="label"
                sx={{padding: 1}}
                onClick={() => setFishPayload({
                  ...fishPayload,
                  name: '',
                  price: '',
                  origin: '',
                  s3Source: '',
                  description: '',
                  videoSource: '',
                  imageSource: ''
                })}>Clear</Button>
            <Divider style={{ height: 10}}/>
            <Button variant="contained" color="primary" fullWidth onClick={() => onSubmitFishClick()}><h3>Submit</h3></Button>

        </Paper>
    );
}

const MainListItems = () => {
    const navigate = useNavigate();
    const handleDashboardClick = () => {
      navigate("/sellerdashboard")
    }
    const handleAddFishClick = () => {
        navigate("/addfish")
    }
    return (
        <React.Fragment>
        <ListItemButton onClick={() => handleDashboardClick()}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => handleAddFishClick()}>
          <ListItemIcon>
            <SetMealIcon />
          </ListItemIcon>
          <ListItemText primary="Add Fish" />
        </ListItemButton>
      </React.Fragment>

    )
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const AddFishPage = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <AddFishForm />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AddFishPage;