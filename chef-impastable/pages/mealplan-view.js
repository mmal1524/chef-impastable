import * as React from 'react';
import clientPromise from '../lib/mongodb_client';
import Navbar from './navbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ListItem } from '@mui/material';
import { ObjectId } from 'mongodb';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { red, blue } from '@mui/material/colors';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, width: '100%'}}>
            <Box sx={{width: '100%'}}>{children}</Box>
          </Box>
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
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

export default function MealPlan({mealPlans, recipes}) {

    const [tabs, setTabs] = React.useState(0);

    const handleChangeTabs = (event, newValue) => {
        setTabs(newValue);
    };

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <>
            <div className="App">
                    <Navbar />
            </div>
            <Box
                sx={{display: 'flex', width: '100%'}}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabs}
                    onChange={handleChangeTabs}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', width: 150 }}
                >
                    {mealPlans.map((mealPlan, index) => (
                        <Tab label={mealPlan.name} {...a11yProps(index)}/>
                    ))}
                </Tabs>
                <Box sx={{width: '100%'}}>
                    {mealPlans.map((mealPlan, index) => (
                        <TabPanel value={tabs} index={index} >
                            <Grid 
                                container 
                                spacing={0}
                                columns={8} 
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="stretch"
                            >
                                {daysOfWeek.map((day, i) => (
                                    <>
                                        <Grid item xs={2} sx={{border: 1, padding: 1}}>
                                            <Box sx={{borderBottom: 1, borderColor: 'black'}}>
                                                <h4 align="center">{day}</h4>
                                            </Box>
                                            {recipes.at(index).at(i).map((recipe) => (
                                                <div>
                                                    <p className='name'>{recipe.title}</p>
                                                    <Divider textAlign='right'>
                                                        <IconButton sx={{padding: 1}}>
                                                            <DeleteIcon sx={{fontSize: 20, color: red[200]}}/>
                                                        </IconButton>
                                                        <IconButton sx={{padding: 1}}>
                                                            <SyncAltIcon sx={{fontSize: 20, color: blue[300]}}/>
                                                        </IconButton>
                                                    </Divider>
                                                    <style jsx>{`
                                                        .name {
                                                            margin-bottom: 0px;
                                                        }
                                                    `}</style>
                                                </div>
                                            ))}
                                        </Grid>
                                    </>
                                ))}
                                
                            </Grid>
                            
                        </TabPanel>
                    ))}
                </Box>
                {/* <TabPanel value={tabs} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={tabs} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={tabs} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={tabs} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={tabs} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={tabs} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={tabs} index={6}>
                    Item Seven
                </TabPanel> */}
            </Box>
  
            {/* <div>
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
            </div> */}
        </>
    );

}

export async function getServerSideProps(context) {
    try {

        const client = await clientPromise;
        const db = client.db("test");

        // obtaining current user
        const user = await db
            .collection("users")
            .findOne({username: context.query.username});

        console.log("USER:")
        console.log(user);

        // obtaining names of user's meal plans
        var mealPlanNames = user.mealPlans;

        console.log("MEAL PLAN NAMES:");
        console.log(mealPlanNames);

        // obtaining meal plan objects from meal plan names
        var mealPlans = new Array(mealPlanNames.length);
        var i = 0;
        for (i; i < mealPlanNames.length; i++) {
            var mealPlan = await db
                .collection("mealplans")
                .findOne({name: mealPlanNames[i], user: context.query.username})
            mealPlans[i] = JSON.parse(JSON.stringify(mealPlan))
        }
        console.log("MEAL PLANS:");
        console.log(mealPlans);

        // obtaining recipes objects from recipe id's within each meal plan
        // recipes[i][j] = meal plan i, day j
        var recipes = new Array(mealPlanNames.length);  
        for (i = 0; i < mealPlanNames.length; i++) {
            recipes[i] = new Array(7);  //
        }                                              
        console.log(recipes);

        for (i = 0; i < mealPlanNames.length; i++) {
            var sundayRecipeIds = mealPlans[i].Sunday;
            var sundayRecipes = new Array(sundayRecipeIds.length);
            var mondayRecipeIds = mealPlans[i].Monday;
            var mondayRecipes = new Array(mondayRecipeIds.length);
            var tuesdayRecipeIds = mealPlans[i].Tuesday;
            var tuesdayRecipes = new Array(tuesdayRecipeIds.length);
            var wednesdayRecipeIds = mealPlans[i].Wednesday;
            var wednesdayRecipes = new Array(wednesdayRecipeIds.length);
            var thursdayRecipeIds = mealPlans[i].Thursday;
            var thursdayRecipes = new Array(thursdayRecipeIds.length);
            var fridayRecipeIds = mealPlans[i].Friday;
            var fridayRecipes = new Array(fridayRecipeIds.length);
            var saturdayRecipeIds = mealPlans[i].Saturday;
            var saturdayRecipes = new Array(saturdayRecipeIds.length);

            
            var j = 0;
            for (j = 0; j < sundayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(sundayRecipeIds[j])});
                sundayRecipes[j] = JSON.parse(JSON.stringify(recipe));
            }
            recipes[i][0] = sundayRecipes;

            for (j = 0; j < mondayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(mondayRecipeIds[j])});
                mondayRecipes[j] = JSON.parse(JSON.stringify(recipe));
            }
            recipes[i][1] = mondayRecipes;

            for (j = 0; j < tuesdayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(tuesdayRecipeIds[j])});
                tuesdayRecipes[j] = JSON.parse(JSON.stringify(recipe));
            }
            recipes[i][2] = tuesdayRecipes;

            for (j = 0; j < wednesdayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(wednesdayRecipeIds[j])});
                wednesdayRecipes[j] = JSON.parse(JSON.stringify(recipe));
            }
            recipes[i][3] = wednesdayRecipes;

            for (j = 0; j < thursdayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(thursdayRecipeIds[j])});
                thursdayRecipes[j] = JSON.parse(JSON.stringify(recipe));
            }
            recipes[i][4] = thursdayRecipes;

            for (j = 0; j < fridayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(fridayRecipeIds[j])});
                fridayRecipes[j] = JSON.parse(JSON.stringify(recipe));
            }
            recipes[i][5] = fridayRecipes;

            for (j = 0; j < saturdayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(saturdayRecipeIds[j])});
                saturdayRecipes[j] = JSON.parse(JSON.stringify(recipe));
            }
            recipes[i][6] = saturdayRecipes;
        }

        console.log(recipes);

        return {
            props: { mealPlans: mealPlans, recipes: recipes },
        };

    }
    catch (e) {
        console.error(e);
    }
}