import * as React from 'react';
import { nanoid } from 'nanoid';
import { useState, useEffect } from "react";
import Rows from "../components/rows"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Home() {
    const [username, setUsername] = useState("");
    const [tagValue, setTagUser] = useState("");
    const [userTags, setUserTags] = useState([]);
    const handleAddTag = e => {
        setTagUser(e.target.value)
    }
    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getTags: {
                get() {
                    return this.dietaryTags
                },
            },
            getUsername: {
                get() {
                    return this.username
                }
            },
        });
        setUsername(thisUser.getUsername);
        setUserTags(thisUser.getTags);
        setUserValue(thisUser);
    }, [])
    console.log(userTags);
    const userDietTags = JSON.stringify(userTags);
    console.log(userDietTags);
    //const myconst = userTags.map((tag) => tag);
    //console.log(myconst);
    //console.log(username);
    return (
        <div className="app-container">
            {userDietTags.map((tag, index) => (
                    <Rows tag={tag} />
                ))}
            <TextField sx={{ width: 400 }} value={tagValue} id="dietarytag" label="dietarytag" variant="outlined" onChange={handleAddTag} />
            <Button
                type="AddTag" size="large" variant="contained" sx={{ mt: 3, mb: 2, width: 200 }}
                onClick={async () => {
                    var data = await AddTag(username, tagValue);             
                    localStorage.setItem('user',
                        JSON.stringify({
                            dietaryTags: data.dietaryTags
                    }));
                }}
            >Add Tag
            </Button>
        </div>
    );
            
}

async function AddTag(username, tag) {
    const res = await fetch('/api/dietarytagsadd', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            tag: tag,
        })
    })
    const data = await res.json();
    return data;
}