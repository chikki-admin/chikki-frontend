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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SetMealIcon from '@mui/icons-material/SetMeal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getFishBySellerId, deleteFish } from '../api/client';
import { HumanFriendlyMessage } from '../constants/constants';

function createData(
    fish_id,
    fish_name,
    price,
    origin,
    status,
    image_source,
  ) {
    return { fish_id, fish_name, price, origin, status, image_source };
  }

const BasicTable = () => {
    const user = useSelector((state) => state.user)
    const [fishbySeller, setFishbySeller] = React.useState([]);
    const getFishForDashboard = () => {
      getFishBySellerId(user.userId).then((allFish) => {
        setFishbySeller(allFish.map((fish) => {
          return createData(fish.id, fish.fish_name, fish.price, fish.origin, fish.status, fish.image_source);
        }
        ))})};
    React.useEffect(() => {getFishForDashboard()}, []);
    const handleFishDelete = (event, fishId) => {
      event.preventDefault();
      deleteFish(fishId, user.token )
      .then(_ => getFishForDashboard())
      .catch(_ => { alert('Something went wrong, cannot delete the item')});
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fish Id</TableCell>
              <TableCell>Fish Name</TableCell>
              <TableCell align="right">Fish Price</TableCell>
              <TableCell align="right">Fish origin</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">Fish Picture</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fishbySeller.map((fish) => (
              <TableRow
                key={fish.fish_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {fish.fish_id.slice(0,6)}
              </TableCell>
                <TableCell component="th" scope="row">
                  {fish.fish_name}
                </TableCell>
                <TableCell align="right">{fish.price}</TableCell>
                <TableCell align="right">{fish.origin}</TableCell>
                <TableCell align="right">{HumanFriendlyMessage[fish.status]}</TableCell>
                <TableCell align="right">{fish.image_source}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={(e) => handleFishDelete(e, fish.fish_id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

function DashboardContent() {
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
            <BasicTable />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}