import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getFish } from '../api/client';
import SimpleDialog from './popup-component';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { Box } from '@mui/system';
import VideoPlayerComponent from './video-player-component';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 300,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
    }
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

export default function DisplayComponent() {
    const [fish, setFish] = React.useState([]);
    React.useEffect(() => {
      getFish().then((fish) => {
        setFish(fish);
      });
    }, []);
  
  
    const [open, setOpen] = React.useState(false);
    const [fishId, setFishId] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [videoSource, setVideoSource] = React.useState("");

    const onBuyClick = (onBuyFishId) => {
        setOpen(true);
        setFishId(onBuyFishId)
    };

    const handleClosePopup = () => {
        setOpen(false)
    };

    const letterStyles = {
        color:"#F2E8DC"
    }

    return(
        <Container sx={{ py: 8 }} maxWidth="30%">
            <p style={letterStyles}>Live Stream section available 7PM Central time daily </p>
            <p style={letterStyles}>Our available selection </p>
            <VideoPlayerComponent open={openModal} setOpen={setOpenModal} videoSource={videoSource}/>
            <SimpleDialog
                open={open}
                handleClose={handleClosePopup}
                fishId={fishId}/>
          <Grid container spacing={4}>
            {fish.map((fishItem) => (
              <Grid item key={fishItem.id} xs={12} sm={6} md={4} lg={2} >
                <ImageButton
                focusRipple
                key={fishItem.id}
                style={{
                    width: '100%',
                }}
                onClick={() => {
                    if (fishItem.bought === false){
                        setVideoSource(fishItem.video_source)
                        setOpenModal(true)
                    }
                }}
                >
                <ImageSrc style={{ backgroundImage: `url(${fishItem.image_source})`, borderRadius: '5px' }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                    >
                    {fishItem.fish_name}
                    </Typography>
                </Image>
                </ImageButton>
                <Box bgcolor="#5DADE2" borderRadius={'5px'}>
                <Typography sx={{ fontSize: '1rem'}} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px' }}>
                    <Typography sx={{ fontSize: '1rem', color: '#F2E8DC'}}>
                    {fishItem.price}$
                    </Typography>
                    <Typography sx={{ fontSize: '0.6rem', padding:'4px', color: '#F2E8DC'}}>
                    {fishItem.description}
                    </Typography>
                    {fishItem.bought ? 
                <Button size="small"
                        color='secondary'
                        style={{ backgroundColor: '#ADD8E6', borderRadius: '20px' }}
                        disabled={true}>
                            <Typography color="red" >Sold</Typography></Button> 

                        :

                        <Button size="small" 
                        color='primary'
                        type='submit'
                        onClick={() => onBuyClick(fishItem.id)}
                        style={{ 
                            backgroundColor: '#ADD8E6',borderRadius: '20px' }}>Buy</Button>}
                </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
    )
}