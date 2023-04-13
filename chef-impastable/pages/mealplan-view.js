import * as React from 'react';
import { useState, useEffect } from "react";
import Navbar from './navbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
//import { ObjectId } from 'mongodb';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { red, blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';

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

export default function MealPlan() {

    const [tabs, setTabs] = useState(0);

    const handleChangeTabs = (event, newValue) => {
        setTabs(newValue);
    };

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [username, setUsername] = useState("");
    var [mealPlans, setMealPlans] = useState([]);
    var [currentMealPlan, setCurrentMealPlan] = useState("");
    var [currentMealPlanIndex, setCurrentMealPlanIndex] = useState(0);
    var [recipes, setRecipes] = useState([]);


    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            }
        });

        async function getMealPlans() {

            var plans = await getMeals(thisUser.username);
            setMealPlans(plans);

            var current = await getCurrentMealPlan(thisUser.username, thisUser.currentMealPlan);
            console.log(current);
            var index = 0;
            var x = 0;
            for (x = 0; x < plans.length; x++) {
                if (plans[x].name == current) {
                    index = x;
                }
            }
            if (current.success == "fail") {
                updateCurrentMealPlan(thisUser.username, plans[0].name)
                setCurrentMealPlan(plans[0]);
                localStorage.setItem('user', JSON.stringify({
                    ...thisUser, 
                    "currentMealPlan": plans[0].name
                }))
            } else {
                setCurrentMealPlan(plans[index]);
            }
    
            setCurrentMealPlanIndex(index);

            var recipeObjects = new Array(plans.length);

            var i = 0;

            for (i = 0; i < plans.length; i++) {
                recipeObjects[i] = new Array(7)
            }
            for (i = 0; i < plans.length; i++) {
                var sundayRecipeIds = plans[i].Sunday;
                var sundayRecipes = new Array(sundayRecipeIds.length);
                var mondayRecipeIds = plans[i].Monday;
                var mondayRecipes = new Array(mondayRecipeIds.length);
                var tuesdayRecipeIds = plans[i].Tuesday;
                var tuesdayRecipes = new Array(tuesdayRecipeIds.length);
                var wednesdayRecipeIds = plans[i].Wednesday;
                var wednesdayRecipes = new Array(wednesdayRecipeIds.length);
                var thursdayRecipeIds = plans[i].Thursday;
                var thursdayRecipes = new Array(thursdayRecipeIds.length);
                var fridayRecipeIds = plans[i].Friday;
                var fridayRecipes = new Array(fridayRecipeIds.length);
                var saturdayRecipeIds = plans[i].Saturday;
                var saturdayRecipes = new Array(saturdayRecipeIds.length);

                var j = 0;
                for (j = 0; j < sundayRecipeIds.length; j++) {
                    var recipe = await getRecipe(sundayRecipeIds[j]);
                    sundayRecipes[j] = recipe;
                }
                recipeObjects[i][0] = sundayRecipes;

                for (j = 0; j < mondayRecipeIds.length; j++) {
                    var recipe = await getRecipe(mondayRecipeIds[j]);
                    mondayRecipes[j] = recipe;
                }
                recipeObjects[i][1] = mondayRecipes;

                for (j = 0; j < tuesdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(tuesdayRecipeIds[j]);
                    tuesdayRecipes[j] = recipe;
                }
                recipeObjects[i][2] = tuesdayRecipes;

                for (j = 0; j < wednesdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(wednesdayRecipeIds[j]);
                    wednesdayRecipes[j] = recipe;
                }
                recipeObjects[i][3] = wednesdayRecipes;

                for (j = 0; j < thursdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(thursdayRecipeIds[j]);
                    thursdayRecipes[j] = recipe;
                }
                recipeObjects[i][4] = thursdayRecipes;

                for (j = 0; j < fridayRecipeIds.length; j++) {
                    var recipe = await getRecipe(fridayRecipeIds[j]);
                    fridayRecipes[j] = recipe;
                }
                recipeObjects[i][5] = fridayRecipes;

                for (j = 0; j < saturdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(saturdayRecipeIds[j]);
                    saturdayRecipes[j] = recipe;
                }
                recipeObjects[i][6] = saturdayRecipes;

                setRecipes(recipeObjects);
            }
        }
        setUsername(thisUser.getUsername);
        getMealPlans();
    }, []);

    const [changeDayOpen, setChangeDayOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    var [chooseMealPlan, setChooseMealPlan] = useState("");
    var [chooseRecipe, setChooseRecipe] = useState("");
    var [indexOfRecipe, setIndexOfRecipe] = useState(0);
    var [oldDay, setOldDay] = useState("");


    const handleChangeDayOpen = (mealPlan, recipe, i, oldDay) => {
        setChangeDayOpen(true);
        setChooseMealPlan(mealPlan);
        setChooseRecipe(recipe);
        setIndexOfRecipe(i);
        setOldDay(oldDay);
    };

    const handleChangeDayClose = () => {
        setChangeDayOpen(false);
    };

    const handleDeleteOpen = (mealPlan, recipe, i, oldDay) => {
        console.log(mealPlan);
        console.log(recipe);
        console.log(i);
        console.log(oldDay);
        setDeleteOpen(true);
        setChooseMealPlan(mealPlan);
        setChooseRecipe(recipe);
        setIndexOfRecipe(i);
        setOldDay(oldDay);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    if (mealPlans.length == 0) {
        return (
            <>
                <div className="App">
                    <Navbar />
                </div>
                <h4 align="center">No Meal Plans, create one now!</h4>
            </>
        )
    };

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
                    <Tab icon={<StarIcon sx={{color: "orange"}} />} label="Current Meal Plan" {...a11yProps(0)} />
                    {mealPlans.map((mealPlan, index) => (
                        index == currentMealPlanIndex ? 
                            <Tab icon={<StarIcon sx={{width: 10, height: 10}} />} iconPosition="start" label={mealPlan.name} {...a11yProps(index + 1)}/> 
                            : 
                            <Tab label={mealPlan.name} {...a11yProps(index + 1)}/>
                    ))}
                </Tabs>
                <Box sx={{width: '100%'}}>

                    {/* Current meal plan */}

                    <TabPanel value={tabs} index={0} >
                        <Button></Button>
                        <Grid 
                            container 
                            spacing={0}
                            columns={14} 
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch"
                            sx={{borderRight: 1}}
                        >
                            {daysOfWeek.map((day, i) => (
                                <>
                                    <Grid item xs={2} sx={{border: 1, borderRight: 0, padding: 1, height: 550}}>
                                        <Box sx={{borderBottom: 1, borderColor: 'black'}}>
                                                <h4 align="center" >{day}</h4>
                                        </Box>
                                        {recipes && recipes.at(currentMealPlanIndex) && recipes.at(currentMealPlanIndex).at(i) && recipes.at(currentMealPlanIndex).at(i).map((recipe, i) => (
                                            <div>
                                                <p className='name'>{recipe.title}</p>
                                                <Divider textAlign='right'>
                                                    <IconButton 
                                                        sx={{padding: 1}}
                                                        onClick={() => handleChangeDayOpen(currentMealPlan, recipe, i, day)}
                                                    >
                                                        <SyncAltIcon sx={{fontSize: 20, color: blue[400]}}/>
                                                    </IconButton>
                                                    <IconButton 
                                                        sx={{padding: 1}}
                                                        onClick={() => handleDeleteOpen(currentMealPlan, recipe, i, day)}
                                                    >
                                                        <DeleteIcon sx={{fontSize: 20, color: red[300]}}/>
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

                    {/* All other meal plans */}
                    {mealPlans.map((mealPlan, index) => (
                        <TabPanel value={tabs} index={index + 1} >
                            {(index == currentMealPlanIndex) ? 
                                <IconButton><StarIcon sx={{width: 30, height: 30, padding: 0, color: "orange"}}/></IconButton>
                                :
                                <IconButton
                                    onClick={async () => {
                                        updateCurrentMealPlan(username, mealPlan);
                                        setCurrentMealPlan(mealPlan);
                                        setCurrentMealPlanIndex(index);
                                        var user = JSON.parse(localStorage.getItem('user'));
                                        localStorage.setItem('user', JSON.stringify({
                                            ...user, 
                                            "currentMealPlan": mealPlan.name
                                        }));
                                    }}
                                >
                                    <StarIcon sx={{width: 30, height: 30, padding: 0}}/>
                                </IconButton>}
                            <Grid 
                                container 
                                spacing={0}
                                columns={14} 
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="stretch"
                                sx={{borderRight: 1}}
                            >
                                {daysOfWeek.map((day, i) => (
                                    <>
                                        <Grid item xs={2} sx={{border: 1, borderRight: 0, padding: 1, height: 550}}>
                                            <Box sx={{borderBottom: 1, borderColor: 'black'}}>
                                                <h4 align="center" >{day}</h4>
                                            </Box>
                                            {recipes && recipes.at(index) && recipes.at(index).at(i) && recipes.at(index).at(i).map((recipe, i) => (
                                                <div>
                                                    <p className='name'>{recipe.title}</p>
                                                    <Divider textAlign='right'>
                                                        <IconButton 
                                                            sx={{padding: 1}}
                                                            onClick={() => handleChangeDayOpen(mealPlan, recipe, i, day)}
                                                        >
                                                            <SyncAltIcon sx={{fontSize: 20, color: blue[400]}}/>
                                                        </IconButton>
                                                        <IconButton 
                                                            sx={{padding: 1}}
                                                            onClick={() => handleDeleteOpen(mealPlan, recipe, i, day)}
                                                        >
                                                            <DeleteIcon sx={{fontSize: 20, color: red[300]}}/>
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

                <Dialog
                    open={changeDayOpen}
                    onClose={handleChangeDayClose}
                >
                    <Box sx={{width: 300}}>
                        <Box sx={{backgroundColor: "orange"}}>
                            <DialogTitle>{chooseMealPlan.name}</DialogTitle>
                        </Box>
                        <DialogTitle>Switch {chooseRecipe.title} to: </DialogTitle>
                        <List>
                            {daysOfWeek.map((day) => (
                                <ListItem disableGutters>
                                    <ListItemButton onClick={async () => {
                                        var index = mealPlans.indexOf(chooseMealPlan);
                                        console.log(username);
                                        console.log(chooseMealPlan);
                                        console.log(chooseMealPlan.name);
                                        console.log(day);
                                        console.log(chooseRecipe._id);

                                        var mealPlan = await addRecipeToMealPlan(username, chooseMealPlan.name, day, chooseRecipe._id);

                                        var indexDay = daysOfWeek.indexOf(day);
                                        
                                        recipes[index][indexDay].push(chooseRecipe);

                                        var mealPlan = await deleteRecipeFromMealPlan(username, chooseMealPlan.name, oldDay, chooseRecipe._id, indexOfRecipe)
                                        indexDay = daysOfWeek.indexOf(oldDay);
                                        
                                        recipes[index][indexDay].splice(indexOfRecipe, 1);

                                        mealPlans[index] = mealPlan;

                                        if (currentMealPlan == chooseMealPlan) {
                                            setCurrentMealPlan(mealPlan);
                                        }
                                        setChangeDayOpen(false);
                                        setChooseMealPlan("");
                                        setChooseRecipe("");
                                        setOldDay("");
                                        setIndexOfRecipe(0);
                                    }}>
                                        <ListItemText primary={day} sx={{textAlign: "center"}}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Dialog>

                <Dialog
                    open={deleteOpen}
                    onClose={handleDeleteClose}
                >
                        <Box sx={{backgroundColor: "orange"}}>
                            <DialogTitle>{chooseMealPlan.name}</DialogTitle>
                        </Box>
                        <DialogContent>
                            <DialogContentText>Delete {chooseRecipe.title}?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteClose} sx={{color: "gray"}}>Cancel</Button>
                            <Button 
                                sx={{color: "red"}}
                                onClick={async () => {
                                    var index = mealPlans.indexOf(chooseMealPlan);
                                    console.log(index);
                                    var mealPlan = await deleteRecipeFromMealPlan(username, chooseMealPlan.name, oldDay, chooseRecipe._id, indexOfRecipe)
                                    console.log(oldDay);
                                    var indexDay = daysOfWeek.indexOf(oldDay);
                                    console.log(indexDay)

                                    recipes[index][indexDay].splice(indexOfRecipe, 1);

                                    mealPlans[index] = mealPlan;

                                    if (currentMealPlan == chooseMealPlan) {
                                        setCurrentMealPlan(mealPlan);
                                    }
                                    setDeleteOpen(false);
                                    setChooseMealPlan("");
                                    setChooseRecipe("");
                                    setOldDay("");
                                    setIndexOfRecipe(0);
                                }} 
                            >
                                delete
                            </Button>
                        </DialogActions>
                    
                </Dialog>
            </Box>
        </>
    );

    async function addRecipeToMealPlan(username, mealPlan, day, recipeID) {
        try {
            const res = await fetch('/api/addRecipeToMealPlan', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    mealPlan: mealPlan,
                    day: day,
                    recipeID: recipeID
                })
            })
            const data = await res.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }

    async function deleteRecipeFromMealPlan(username, mealPlan, day, recipeID, index) {
        try {
            const res = await fetch('/api/deleteRecipeFromMealPlan', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    plan: mealPlan,
                    day: day,
                    recipeID: recipeID,
                    index: index
                })
            })
            const data = await res.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }

    async function updateCurrentMealPlan(username, mealPlan) {
        console.log(username);
        console.log(mealPlan);
        const res = await fetch('/api/updateCurrentMealPlan', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                mealPlan: mealPlan
            })
        })
        const data = await res.json();
        return data;
    }

}

async function getCurrentMealPlan(username, mealPlan) {
    const res = await fetch('/api/getCurrentMealPlan', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            mealPlan: mealPlan
        })
    })
    const data = await res.json();
    return data;
}

async function getMeals(username) {
    const res = await fetch('/api/getMealPlans', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username
        })
    })
    const data = await res.json();
    return data;
}

async function getRecipe(recipeID) {
    const res = await fetch('/api/getRecipe', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: recipeID
        })
    })
    const data = await res.json();
    return data;
}

