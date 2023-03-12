import * as React from 'react';
import { Autocomplete } from '@mui/material';
import { TextField, DialogTitle, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { Dialog } from '@mui/material';

export default function SaveRecipeDialog(props) {
    const folderOptions = ["none"];
    const [folder, setFolder] = useState("none")

    return (
        <Dialog open={props.show} onClose={props.onClose}>
            <DialogTitle>Save Recipe</DialogTitle>
            <DialogContent>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    freeSolo
                    options={Object.keys(folderOptions).map((option) => option)}
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
                    // onClick={}
                >
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    );
}