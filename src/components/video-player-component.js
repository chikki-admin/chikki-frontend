import React from "react";
import { Modal } from "@mui/material";
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

const VideoPlayerComponent = (props) => {
    const { videoSource, open, setOpen } = props;
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ 
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', width:"80%", height:"80%",
                bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Fish Swimming video
            </Typography>
            <video
                id="my-video"
                className="video-js"
                controls
                preload="auto"
                width="100%"
                height="90%"
                poster="MY_VIDEO_POSTER.jpg"
                data-setup="{}"
                
                >
                <source src={videoSource} type="video/mp4" />
                <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/">supports HTML5 video</a>
                </p>
            </video>
            </Box>
        </Modal>
    );
}

export default VideoPlayerComponent;