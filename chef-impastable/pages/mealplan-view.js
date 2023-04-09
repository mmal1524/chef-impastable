import * as React from 'react';
import Navbar from './navbar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { ListItem } from '@mui/material';

export default function MealPlan() {
    return (
        <>
            <div className="App">
                    <Navbar />
            </div>
            <div>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <h4>Sunday</h4>
                    <h4>Monday</h4>
                    <h4>Tuesday</h4>
                    <h4>Wednesday</h4>
                    <h4>Thursday</h4>
                    <h4>Friday</h4>
                    <h4>Saturday</h4>
                </Stack>
            </div>
        </>
    );
}