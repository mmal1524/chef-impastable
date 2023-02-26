import * as React from 'react';
import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider, TextField, Grid } from '@mui/material';
import Navbar from './navbar.js'
import Button from '@mui/material/Button';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Grid sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Grid>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Kitchen() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>

            <div className="App">
                <Navbar />
            </div>
            <h2>
                <Link href="/homepage">Back to home</Link>
            </h2>
            <div>
                <Grid sx={{ width: '100%' }}>
                    <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Fridge" {...a11yProps(0)} />
                            <Tab label="Kitchen" {...a11yProps(1)} />
                        </Tabs>
                    </Grid>
                    <TabPanel value={value} index={0}>
                        Fridge
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid container>
                            <Grid>
                                <TextField
                                    id="search-kitchen"
                                    label="Search"
                                    variant="outlined"
                                />
                                <Button 
                                    type="submit" 
                                    size="large"
                                    variant="contained"
                                    onClick={() => {
                                        //search for appliance
                                        console.log("clicked")
                                    }}
                                >
                                    Enter
                                </Button>
                            </Grid>
                            <Grid item xs></Grid>
                            <Grid>
                                <Button 
                                    type="submit" 
                                    size="large"
                                    variant="contained"
                                    onClick={() => {
                                        //route to edit page
                                        console.log("clicked")
                                    }}
                                >
                                    Edit Kitchen
                                </Button>
                            </Grid>
                        </Grid>

                    </TabPanel>
                </Grid>
            </div>
        </>
    );
}