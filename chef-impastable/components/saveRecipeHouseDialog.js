import * as React from 'react';
import { Typography } from '@mui/material';
import { TextField, DialogTitle, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { Dialog } from '@mui/material';
import { getFolders } from '../pages/routes/savedRecipeRoutes';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';


export default function SaveRecipeHouseDialog(props) {
    // const folderOptions = [props.options];
    const [house, setHouse] = useState([]);
    const [folder, setFolder] = useState("none")
    const [folders, setFolders] = useState([]);
    const [houses, setHouses] = useState([]);
    const [houseIds, setHouseIds] = useState([]);

    useEffect(() => {
        async function getHouses() {
            var h = [];
            var thisUser = JSON.parse(localStorage.getItem("user"))
            for (var i = 0; i < thisUser.households.length; i++) {
                h.push(await getHouse(thisUser.households[i]))
            }
            setHouses(h);
        }
        getHouses();
        setHouse([]);
    }, [props.show])

    // useEffect(() => {
    //     // debugger;
    //     //console.log(recipes)
    //     var thisUser = JSON.parse(localStorage.getItem("user"))
    //     // var saved = thisUser.saved
    //     async function getSavedFolders() {
    //         var f = await getFolders(thisUser.username, false)
    //         setFolders(f.map((sf => sf.name)))
    //     }
    //     getSavedFolders();
    // }, [house])

    return (
        <Dialog data-test="SaveHouseDialog" open={props.show} onClose={props.onClose}
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle>{props.title ? props.title : "Save Recipe to Household"}</DialogTitle>
            <DialogContent>
                {houses.length > 0 ? 
                <>
                <FormControl sx = {{m: 1, width:400}}>
                    <InputLabel>Household</InputLabel>
                    <Select
                        //chip design: https://mui.com/material-ui/react-select/
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                        value={house}
                        multiple
                        onChange={(event) => {
                            //setHouse(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)
                            const newHouseArr = event.target.value === 'string' ? event.target.value.split(',') : event.target.value
                            setHouse(newHouseArr);
                            //const newHouseIds = event.target.value.map((tempH, index) => typeof tempH === 'string' ? tempH : houses[tempH]._id)
                            //setHouseIds(newHouseIds);
                        }}
                        label="Household"
                        >
                            {houses.map((h, index) => (
                                <MenuItem
                                    key={index}
                                    value={`${h.name}: ${h.members.toString()}`}
                                >{`${h.name}: ${h.members.toString()}`}</MenuItem>  
                            ))}
                        </Select>
                </FormControl>
                
                    <Button
                        data-test="SaveHouseDialogSubmit"
                        type="submit" 
                        size="large"
                        disabled={house.length == 0}
                        variant="contained"
                        sx={{
                            mx: 3,
                            mt: 1,
                        }}
                        onClick={() => props.onSubmit(house)}
                    >
                        Save
                    </Button>
                    </>
                    
                : <div>Create a household to save this recipe</div>}
            </DialogContent>
        </Dialog>
    );
}

async function getHouse(household_id) {
    console.log(household_id);
    const res = await fetch('/api/getHouseholds', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: household_id,
            getData: true
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
}