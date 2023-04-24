import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getFishPagination } from '../api/client';
import SimpleDialog from './popup-component';
import { Box } from '@mui/system';
import VideoPlayerComponent from './video-player-component';
import ClickableImageButton from './utility-components/image-button';
import InfiniteScroll from "react-infinite-scroller";
import PersonIcon from '@mui/icons-material/Person';

export default function DisplayComponent() {
    const [fish, setFish] = React.useState([]);
  
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [videoSource, setVideoSource] = React.useState("");
    const [scrollingOffset, setScrollingOffset] = React.useState(0);
    const [isMoreFish, setIsMoreFish] = React.useState(true);

    const onBuyClick = () => {
        setOpen(true);
    };

    const handleClosePopup = () => {
        setOpen(false)
    };

    const letterStyles = {
        color:"#F2E8DC"
    }

    const getMoreFish = () => {
      getFishPagination(scrollingOffset).then((fetchFished) => {
        setFish(fish.concat(fetchFished));
        setScrollingOffset(scrollingOffset + 3)
        if(fetchFished.length === 0){
          setIsMoreFish(false);
        }
      });
    }

    return(
        <Container maxWidth="30%">
            <p style={letterStyles}>Live Stream section available 7PM Central time daily </p>
            <p style={letterStyles}>Our available selection </p>
            <VideoPlayerComponent open={openModal} setOpen={setOpenModal} videoSource={videoSource}/>
            <InfiniteScroll
              pageStart={0}
              loadMore={getMoreFish}
              hasMore={isMoreFish}
              loader={
                <div className="loader" key="loader">
                  Loading ...
                </div>
              }
            >
              <Grid container spacing={4} sx={{py:1}}>
                {fish.map((fishItem) => (
                  <Grid item key={fishItem.id} xs={12} sm={6} md={4} lg={2} >
                    <SimpleDialog
                        open={open}
                        handleClose={handleClosePopup}
                        fishId={fishItem.id}
                        fishName={fishItem.fish_name}
                        fishPrice={fishItem.price}
                        imgSource={fishItem.image_source}
                        />
                    <ClickableImageButton fishItem={fishItem} setOpenModal={setOpenModal} setVideoSource={setVideoSource}/>
                    <Box bgcolor="#5DADE2" borderRadius={'5px'}>
                    <Typography sx={{ fontSize: '1rem'}} style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize: '1.25rem', color: '#F2E8DC'}}>
                        {fishItem.price}$
                        </Typography>
                        <Typography sx={{ fontSize: '1.25rem',color: '#F2E8DC'}}>
                        <PersonIcon /> {fishItem.seller_name}
                        </Typography>
                        {fishItem.status === 'sold' ? 
                    <Button size="small"
                            color='secondary'
                            style={{ backgroundColor: '#ADD8E6', borderRadius: '20px' }}
                            disabled={true}>
                                <Typography color="red" >Sold</Typography></Button> 
                            :
                            <Button size="small" 
                            color='primary'
                            type='submit'
                            onClick={() => onBuyClick()}
                            style={{ 
                                backgroundColor: '#ADD8E6',borderRadius: '20px' }}>Buy</Button>}
                    </Typography>
                    </Box>
                  </Grid>
            ))}
          </Grid>
          </InfiniteScroll>
        </Container>
    )
}