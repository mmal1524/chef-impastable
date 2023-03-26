import * as React from 'react';
import { Autocomplete, Typography } from '@mui/material';
import { TextField, DialogTitle, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { Dialog } from '@mui/material';
import { getFolders } from '../pages/routes/savedRecipeRoutes';

export default function SaveRecipeDialog(props) {
    console.log(props.options);
    // const folderOptions = [props.options];
    const [folder, setFolder] = useState("none")
    const [folders, setFolders] = useState([]);
    
    useEffect(() => {
        debugger;
        //console.log(recipes)
        var thisUser = JSON.parse(localStorage.getItem("user"))
        // var saved = thisUser.saved
        async function getSavedFolders() {
            var f = await getFolders(thisUser.username)
            setFolders(f.map((sf => sf.name)))
        }
        getSavedFolders();
        
        console.log(thisUser)
    }, [props.show])

    return (
        <Dialog open={props.show} onClose={props.onClose}>
            <DialogTitle>{props.title ? props.title : "Save Recipe"}</DialogTitle>
            <DialogContent>
                {props.unsave ? 
                <>
                    <Button onClick={props.unsave}>
                        Unsave
                    </Button>
                    <Typography>
                        OR
                    </Typography>
                </>
                : null}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    freeSolo
                    options={folders}
                    //renderOption={(props, option) => <li {...props}>{option.title}</li>}
                    onInputChange={(e, new_val) => {console.log(new_val); setFolder(new_val)}}
                    //sx={{ width: windowSize[0]/3 }}
                    renderInput={params => (
                        <TextField 
                            {...params} 
                            label="New or Existing Folder Name"
                            onChange={({ target }) => setFolder(target.value)} 
                        />
                    )}
                />
                <Button 
                    type="submit" 
                    size="large"
                    variant="contained"
                    sx={{
                        mx: 3,
                        mt: 1,
                    }}
                    onClick={() => {props.onSubmit(folder)}}
                >
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    );
}