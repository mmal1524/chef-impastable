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
import ButtonBase from '@mui/material/ButtonBase';
import Router from "next/router";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

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

    const [calories, setCalories] = useState("");
    const [carbs, setCarbs] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [fiber, setFiber] = useState("");
    const [protein, setProtein] = useState("");
    const [saturatedFat, setSaturatedFat] = useState("");
    const [sodium, setSodium] = useState("");
    const [fat, setFat] = useState("");
    const [unsaturatedFat, setUnsaturatedFat] = useState("");

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

            var currCalories = 0;
            var currCarbs = 0;
            var currCholesterol = 0;
            var currFiber = 0;
            var currProtein = 0;
            var currSaturatedFat = 0;
            var currSodium = 0;
            var currFat = 0;
            var currUnsaturatedFat = 0;

            function calculateNutrients(recipe) {
                if (recipe.nutrients.calories) {
                    currCalories += Number(recipe.nutrients.calories.split(" ")[0]);
                }
                if (recipe.nutrients.carbohydrateContent) {
                    currCarbs += Number(recipe.nutrients.carbohydrateContent.split(" ")[0]);
                }
                if (recipe.nutrients.cholesterolContent) {
                    currCholesterol += Number(recipe.nutrients.cholesterolContent.split(" ")[0]);
                }
                if (recipe.nutrients.fiberContent) {
                    currFiber += Number(recipe.nutrients.fiberContent.split(" ")[0]);
                }
                if (recipe.nutrients.proteinContent) {
                    currProtein += Number(recipe.nutrients.proteinContent.split(" ")[0]);
                }
                if (recipe.nutrients.saturatedFatContent) {
                    currSaturatedFat += Number(recipe.nutrients.saturatedFatContent.split(" ")[0]);
                }
                if (recipe.nutrients.sodiumContent) {
                    currSodium += Number(recipe.nutrients.sodiumContent.split(" ")[0]);
                }
                if (recipe.nutrients.fatContent) {
                    currFat += Number(recipe.nutrients.fatContent.split(" ")[0]);
                }
                if (recipe.nutrients.unsaturatedFatContent) {
                    currUnsaturatedFat += Number(recipe.nutrients.unsaturatedFatContent.split(" ")[0])
                }
            }

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
                    calculateNutrients(recipe);
                    sundayRecipes[j] = recipe;
                }
                recipeObjects[i][0] = sundayRecipes;

                for (j = 0; j < mondayRecipeIds.length; j++) {
                    var recipe = await getRecipe(mondayRecipeIds[j]);
                    calculateNutrients(recipe);
                    mondayRecipes[j] = recipe;
                }
                recipeObjects[i][1] = mondayRecipes;

                for (j = 0; j < tuesdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(tuesdayRecipeIds[j]);
                    calculateNutrients(recipe);
                    tuesdayRecipes[j] = recipe;
                }
                recipeObjects[i][2] = tuesdayRecipes;

                for (j = 0; j < wednesdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(wednesdayRecipeIds[j]);
                    calculateNutrients(recipe);
                    wednesdayRecipes[j] = recipe;
                }
                recipeObjects[i][3] = wednesdayRecipes;

                for (j = 0; j < thursdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(thursdayRecipeIds[j]);
                    calculateNutrients(recipe);
                    thursdayRecipes[j] = recipe;
                }
                recipeObjects[i][4] = thursdayRecipes;

                for (j = 0; j < fridayRecipeIds.length; j++) {
                    var recipe = await getRecipe(fridayRecipeIds[j]);
                    calculateNutrients(recipe);
                    fridayRecipes[j] = recipe;
                }
                recipeObjects[i][5] = fridayRecipes;

                for (j = 0; j < saturdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(saturdayRecipeIds[j]);
                    calculateNutrients(recipe);
                    saturdayRecipes[j] = recipe;
                }
                recipeObjects[i][6] = saturdayRecipes;

                setCalories(currCalories);
                setCarbs(currCarbs);
                setCholesterol(currCholesterol);
                setFiber(currFiber);
                setProtein(currProtein);
                setSaturatedFat(currSaturatedFat);
                setSodium(currSodium);
                setFat(currFat);
                setSaturatedFat(currSaturatedFat);
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
    const [caloriesUpper, setCaloriesUpper] = useState("");
    const [carbsUpper, setCarbsUpper] = useState("");
    const [cholesterolUpper, setCholesterolUpper] = useState("");
    const [fiberUpper, setFiberUpper] = useState("");
    const [proteinUpper, setProteinUpper] = useState("");
    const [saturatedFatUpper, setSaturatedFatUpper] = useState("");
    const [sodiumUpper, setSodiumUpper] = useState("");
    const [fatUpper, setFatUpper] = useState("");
    const [unsaturatedFatUpper, setUnsaturatedFatUpper] = useState("");
    const [caloriesLower, setCaloriesLower] = useState("");
    const [carbsLower, setCarbsLower] = useState("");
    const [cholesterolLower, setCholesterolLower] = useState("");
    const [fiberLower, setFiberLower] = useState("");
    const [proteinLower, setProteinLower] = useState("");
    const [saturatedFatLower, setSaturatedFatLower] = useState("");
    const [sodiumLower, setSodiumLower] = useState("");
    const [fatLower, setFatLower] = useState("");
    const [unsaturatedFatLower, setUnsaturatedFatLower] = useState("");

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

    const [successOpen, setSuccessOpen] = React.useState(false);
    const [failOpen, setFailOpen] = React.useState(false);

    const handleSuccessOpen = () => {
        setSuccessOpen(true);
    }
    const handleSuccesClose = () => {
        setSuccessOpen(false);
    }
    const handleFailOpen = () => {
        setFailOpen(true);
    }
    const handleFailClose = () => {
        setFailOpen(false);
    }

    const handleCaloriesUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setCaloriesUpper(upperNum)
    }
    const handleCarbsUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setCarbsUpper(upperNum)
    }
    const handleCholesterolUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setCholesterolUpper(upperNum)
    }
    const handleFiberUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setFiberUpper(upperNum)
    }
    const handleProteinUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setProteinUpper(upperNum)
    }
    const handleSaturatedFatUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setSaturatedFatUpper(upperNum)
    }
    const handleSodiumUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setSodiumUpper(upperNum)
    }
    const handleFatUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setFatUpper(upperNum)
    }
    const handleUnsaturatedFatUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setUnsaturatedFatUpper(upperNum)
    }

    const handleCaloriesLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setCaloriesLower(lowerNum)
    }
    const handleCarbsLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setCarbsLower(lowerNum)
    }
    const handleCholesterolLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setCholesterolLower(lowerNum)
    }
    const handleFiberLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setFiberLower(lowerNum)
    }
    const handleProteinLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setProteinLower(lowerNum)
    }
    const handleSaturatedFatLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setSaturatedFatLower(lowerNum)
    }
    const handleSodiumLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setSodiumLower(lowerNum)
    }
    const handleFatLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setFatLower(lowerNum)
    }
    const handleUnsaturatedFatLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setUnsaturatedFatLower(lowerNum)
    }

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
                                    <Grid item xs={2} sx={{border: 1, borderRight: 0, padding: 1, height: 450}}>
                                        <Box sx={{borderBottom: 1, borderColor: 'black'}}>
                                                <h4 align="center" >{day}</h4>
                                        </Box>
                                        {recipes && recipes.at(currentMealPlanIndex) && recipes.at(currentMealPlanIndex).at(i) && recipes.at(currentMealPlanIndex).at(i).map((recipe, i) => (
                                            <div>
                                                <ButtonBase
                                                    onClick={() => {
                                                        Router.push({pathname:"/recipe-view/", query: {id: recipe._id, username: username}})
                                                    }}
                                                >
                                                    <p className='name'>{recipe.title}</p>
                                                </ButtonBase>
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
                        &nbsp;
                        <Grid>
                            <TableContainer component={Paper} sx={{ maxWidth: 1163 }}>
                                <Table sx={{ maxWidth: 1163 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Set your goals here:</TableCell>
                                            <TableCell align="right">Lower bound</TableCell>
                                            <TableCell align="right">Upper bound</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">View more</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            key={"Calories"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Calories"}
                                            </TableCell>
                                            <TableCell data-test="GoalCaloriesLower" align="right">{<TextField size="small" id="outlined-basic" label="Calories (kcal)" variant="outlined" onChange={handleCaloriesLower} />}</TableCell>
                                            <TableCell data-test="GoalsCaloriesUpper" align="right">{<TextField size="small" id="outlined-basic" label="Calories (kcal)" variant="outlined" onChange={handleCaloriesUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(calories, caloriesLower, caloriesUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Carbohydrate Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Carbohydrate Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Carbohydrate Content (g)" variant="outlined" onChange={handleCarbsLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Carbohydrate Content (g)" variant="outlined" onChange={handleCarbsUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(carbs, carbsLower, carbsUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Cholesterol Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Cholesterol Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Cholesterol Content (mg)" variant="outlined" onChange={handleCholesterolLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Cholesterol Content (mg)" variant="outlined" onChange={handleCholesterolUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(cholesterol, cholesterolLower, cholesterolUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Fiber Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Fiber Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Fiber Content (g)" variant="outlined" onChange={handleFiberLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Fiber Content (g)" variant="outlined" onChange={handleFiberUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(fiber, fiberLower, fiberUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Protein Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Protein Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Protein Content (g)" variant="outlined" onChange={handleProteinLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Protein Content (g)" variant="outlined" onChange={handleProteinUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(protein, proteinLower, proteinUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Saturated Fat Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Saturated Fat Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Saturated Fat Content (g)" variant="outlined" onChange={handleSaturatedFatLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Saturated Fat Content (g)" variant="outlined" onChange={handleSaturatedFatUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(saturatedFat, saturatedFatLower, saturatedFatUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Sodium Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Sodium Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Sodium Content (mg)" variant="outlined" onChange={handleSodiumLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Sodium Content (mg)" variant="outlined" onChange={handleSodiumUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(sodium, sodiumLower, sodiumUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Fat Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Fat Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Fat Content (g)" variant="outlined" onChange={handleFatLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Fat Content (g)" variant="outlined" onChange={handleFatUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(fat, fatLower, fatUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Unsaturated Fat Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Unsaturated Fat Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Unsaturated Fat Content (g)" variant="outlined" onChange={handleUnsaturatedFatLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Unsaturated Fat Content (g)" variant="outlined" onChange={handleUnsaturatedFatUpper} />}</TableCell>
                                            <TableCell align="right">{determineStatus(unsaturatedFat, unsaturatedFatLower, unsaturatedFatUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                            >
                                            </Button>}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                                        <Grid item xs={2} sx={{border: 1, borderRight: 0, padding: 1, height: 450}}>
                                            <Box sx={{borderBottom: 1, borderColor: 'black'}}>
                                                <h4 align="center" >{day}</h4>
                                            </Box>
                                            {recipes && recipes.at(index) && recipes.at(index).at(i) && recipes.at(index).at(i).map((recipe, i) => (
                                                <div>
                                                    <ButtonBase
                                                        onClick={() => {
                                                            Router.push({pathname:"/recipe-view/", query: {id: recipe._id, username: username}})
                                                        }}
                                                    >
                                                        <p className='name'>{recipe.title}</p>
                                                    </ButtonBase>
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

    function determineStatus(amount, lower, upper) {
        console.log(amount)

        if (amount >= lower && amount <= upper) {
            return (
                <div>
                  <CheckIcon
                    sx={{color:'green'}}
                    >
                    </CheckIcon>  
                </div>
            )
        }
        if (amount < lower || amount > upper) {
            return (
                <div>
                    <ClearIcon 
                        sx={{color:'red'}}
                    >
                    </ClearIcon>
                </div>
            )
        }
        if (lowerNum == 0 && upperNum == 0) {
            return (
                <div>
                    <HorizontalRuleIcon 
                        sx={{color:'grey'}}
                    >
                    </HorizontalRuleIcon>
                </div>
            )
        }
    }

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