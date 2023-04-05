import * as React from 'react';
import { postFish } from '../api/client';

export default function AdminComponent() {
    const [fishPayload, setFishPayload] = React.useState({
        name: '',
        price: '',
        origin: '',
        s3Source: '',
        description: '',
        videoSource: '',
        username: '',
        password: ''
    });
    const handleSubmit = (event) => {
        postFish(fishPayload).then((response) => {
            if (response === 'OK') {
                setFishPayload({
                    name: '',
                    price: '',
                    origin: '',
                    s3Source: '',
                    description: '',
                    videoSource: '',
                    username: '',
                    password: ''
                })
    }});
        event.preventDefault();
      };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={fishPayload.name} 
                    onChange={(event) => 
                    setFishPayload({
                        ...fishPayload,
                        name: event.target.value})} />
            </label>
        <br />
            <label>
                Price:
                <input type="text" value={fishPayload.price} 
                    onChange={(event) => 
                    setFishPayload({
                        ...fishPayload,
                        price: event.target.value})} />
            </label>
        <br />
            <label>
                Origin:
                <input type="text" value={fishPayload.origin} 
                    onChange={(event) => 
                    setFishPayload({
                        ...fishPayload,
                        origin: event.target.value})} />
            </label>
        <br />
        <label>
                S3 Source:
                <input type="text" value={fishPayload.s3Source} 
                    onChange={(event) => 
                    setFishPayload({
                        ...fishPayload,
                        s3Source: event.target.value})} />
            </label>
        <br />
        <label>
                Description:
                <input type="text" value={fishPayload.description} 
                    onChange={(event) => 
                    setFishPayload({
                        ...fishPayload,
                        description: event.target.value})} />
            </label>
        <br />
        <label>
                Video Source:
                <input type="text" value={fishPayload.videoSource} 
                    onChange={(event) => 
                    setFishPayload({
                        ...fishPayload,
                        videoSource: event.target.value})} />
            </label>
        <br />
        <label>
                Username:
                <input type="text" value={fishPayload.username} 
                    onChange={(event) => 
                    setFishPayload({
                        ...fishPayload,
                        username: event.target.value})} />
            </label>
        <br />
        <label>
                password:
                <input type="text" value={fishPayload.password} 
                    onChange={(event) => 
                    setFishPayload({
                        ...fishPayload,
                        password: event.target.value})} />
            </label>
        <br />
            <button type="submit">Submit</button>
        </form>
    );
}