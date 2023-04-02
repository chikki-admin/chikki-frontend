import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getFish } from '../api/client';
import SimpleDialog from './popup-component';

export default function DisplayComponent() {
    const [fish, setFish] = React.useState([]);
    React.useEffect(() => {
      getFish().then((fish) => {
        setFish(fish);
      });
    }, []);
  
  
    const [open, setOpen] = React.useState(false);
    const [fishId, setFishId] = React.useState(0);

    const onBuyClick = (onBuyFishId) => {
        setOpen(true);
        setFishId(onBuyFishId)
    };

    const handleClosePopup = () => {
        setOpen(false)
    };

    const cardStyles = {
        backgroundColor: "#F2E8DC"
    }
    const letterStyles = {
        color:"#F2E8DC"
    }

    return(
        <Container sx={{ py: 8 }} maxWidth="30%">
            <p style={letterStyles}>Live Stream section available 7PM Central time daily</p>
            <p style={letterStyles}>Our available selection</p>
            <SimpleDialog
                open={open}
                handleClose={handleClosePopup}
                fishId={fishId}/>
          <Grid container spacing={4}>
            {fish.map((fishItem) => (
              <Grid item key={fishItem.id} xs={12} sm={6} md={4} lg={2}>
                <Card
                  sx={{ height: '94%', display: 'flex', flexDirection: 'column'}}
                  style={cardStyles}
                >
                  <CardMedia
                    component="img"
                    image={fishItem.image_source}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1, paddingTop: '5px', paddingBottom: '5px'}}>
                    <Typography sx={{ fontSize: '1rem'}} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {fishItem.fish_name}
                        <Typography sx={{ fontSize: '1rem'}}>
                        {fishItem.price}$
                        </Typography>
                        {fishItem.bought ? 
                    <Button size="small"
                            color='secondary'
                            style={{ backgroundColor: '#ADD8E6' }}
                            disabled={true}>
                              <Typography color="red" >Sold</Typography></Button> 

                            :

                            <Button size="small" 
                            color='primary'
                            type='submit'
                            onClick={() => onBuyClick(fishItem.id)}
                            style={{ 
                                backgroundColor: '#ADD8E6',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                        color: '#3c52b2' }}}>Buy</Button>}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    )
}