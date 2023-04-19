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
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

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
    const [caloriesWeek, setCaloriesWeek] = useState([]);
    const [carbs, setCarbs] = useState("");
    const [carbsWeek, setCarbsWeek] = useState([]);
    const [cholesterol, setCholesterol] = useState("");
    const [cholesterolWeek, setCholesterolWeek] = useState([]);
    const [fiber, setFiber] = useState("");
    const [fiberWeek, setFiberWeek] = useState([]);
    const [protein, setProtein] = useState("");
    const [proteinWeek, setProteinWeek] = useState([]);
    const [saturatedFat, setSaturatedFat] = useState("");
    const [saturatedFatWeek, setSatruatedFatWeek] = useState([]);
    const [sodium, setSodium] = useState("");
    const [sodiumWeek, setSodiumWeek] = useState([]);
    const [fat, setFat] = useState("");
    const [fatWeek, setFatWeek] = useState([]);
    const [unsaturatedFat, setUnsaturatedFat] = useState("");
    const [unsaturatedFatWeek, setUnsaturatedFatWeek] = useState([]);

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
                    currCalories += Number(recipe.nutrients.calories.split(" ")[0])
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

            function calculateDay(recipes, day) {
                var cal = 0;
                var car = 0;
                var chol = 0;
                var fib = 0;
                var pro = 0;
                var sat = 0;
                var sod = 0;
                var fa = 0;
                var un = 0;

                for (recipe in recipes) {
                    if (recipes[recipe].nutrients.calories) {
                        cal += Number(recipes[recipe].nutrients.calories.split(" ")[0])
                    }
                    if (recipes[recipe].nutrients.carbohydrateContent) {
                        car += Number(recipes[recipe].nutrients.carbohydrateContent.split(" ")[0]);
                    }
                    if (recipes[recipe].nutrients.cholesterolContent) {
                        chol += Number(recipes[recipe].nutrients.cholesterolContent.split(" ")[0]);
                    }
                    if (recipes[recipe].nutrients.fiberContent) {
                        fib += Number(recipes[recipe].nutrients.fiberContent.split(" ")[0]);
                    }
                    if (recipes[recipe].nutrients.proteinContent) {
                        pro += Number(recipes[recipe].nutrients.proteinContent.split(" ")[0]);
                    }
                    if (recipes[recipe].nutrients.saturatedFatContent) {
                        sat += Number(recipes[recipe].nutrients.saturatedFatContent.split(" ")[0]);
                    }
                    if (recipes[recipe].nutrients.sodiumContent) {
                        sod += Number(recipes[recipe].nutrients.sodiumContent.split(" ")[0]);
                    }
                    if (recipes[recipe].nutrients.fatContent) {
                        fa += Number(recipes[recipe].nutrients.fatContent.split(" ")[0]);
                    }
                    if (recipes[recipe].nutrients.unsaturatedFatContent) {
                        un += Number(recipes[recipe].nutrients.unsaturatedFatContent.split(" ")[0])
                    }
                }
                caloriesWeek[day] = cal;
                carbsWeek[day] = car;
                cholesterolWeek[day] = chol;
                fiberWeek[day] = fib;
                proteinWeek[day] = pro;
                saturatedFatWeek[day] = sat;
                sodiumWeek[day] = sod;
                fatWeek[day] = fa;
                unsaturatedFatWeek[day] = un;
            }

            var index = 0;
            var x = 0;
            for (x = 0; x < plans.length; x++) {
                if (plans[x].name == current) {
                    index = x;
                }
            }
            if (current.success == "fail") {
                if (plans.length != 0) {
                    updateCurrentMealPlan(thisUser.username, plans[0].name)
                    setCurrentMealPlan(plans[0]);
                    localStorage.setItem('user', JSON.stringify({
                        ...thisUser, 
                        "currentMealPlan": plans[0].name
                    }))
                }
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
                calculateDay(sundayRecipes, 0);

                for (j = 0; j < mondayRecipeIds.length; j++) {
                    var recipe = await getRecipe(mondayRecipeIds[j]);
                    calculateNutrients(recipe);
                    mondayRecipes[j] = recipe;
                }
                recipeObjects[i][1] = mondayRecipes;
                calculateDay(mondayRecipes, 1);

                for (j = 0; j < tuesdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(tuesdayRecipeIds[j]);
                    calculateNutrients(recipe);
                    tuesdayRecipes[j] = recipe;
                }
                recipeObjects[i][2] = tuesdayRecipes;
                calculateDay(tuesdayRecipes, 2);

                for (j = 0; j < wednesdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(wednesdayRecipeIds[j]);
                    calculateNutrients(recipe);
                    wednesdayRecipes[j] = recipe;
                }
                recipeObjects[i][3] = wednesdayRecipes;
                calculateDay(wednesdayRecipes, 3);

                for (j = 0; j < thursdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(thursdayRecipeIds[j]);
                    calculateNutrients(recipe);
                    thursdayRecipes[j] = recipe;
                }
                recipeObjects[i][4] = thursdayRecipes;
                calculateDay(thursdayRecipes, 4);

                for (j = 0; j < fridayRecipeIds.length; j++) {
                    var recipe = await getRecipe(fridayRecipeIds[j]);
                    calculateNutrients(recipe);
                    fridayRecipes[j] = recipe;
                }
                recipeObjects[i][5] = fridayRecipes;
                calculateDay(fridayRecipes, 5);

                for (j = 0; j < saturdayRecipeIds.length; j++) {
                    var recipe = await getRecipe(saturdayRecipeIds[j]);
                    calculateNutrients(recipe);
                    saturdayRecipes[j] = recipe;
                }
                recipeObjects[i][6] = saturdayRecipes;
                calculateDay(saturdayRecipes, 6);

                setCalories(currCalories);
                setCarbs(currCarbs);
                setCholesterol(currCholesterol);
                setFiber(currFiber);
                setProtein(currProtein);
                setSaturatedFat(currSaturatedFat);
                setSodium(currSodium);
                setFat(currFat);
                setUnsaturatedFat(currUnsaturatedFat);
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

    const [caloriesUpper, setCaloriesUpper] = useState("");
    const [caloriesTempUpper, setCaloriesTempUpper] = useState("");
    const [carbsUpper, setCarbsUpper] = useState("");
    const [carbsTempUpper, setCarbsTempUpper] = useState("");
    const [cholesterolUpper, setCholesterolUpper] = useState("");
    const [cholesterolTempUpper, setCholesterolTempUpper] = useState("");
    const [fiberUpper, setFiberUpper] = useState("");
    const [fiberTempUpper, setFiberTempUpper] = useState("");
    const [proteinUpper, setProteinUpper] = useState("");
    const [proteinTempUpper, setProteinTempUpper] = useState("");
    const [saturatedFatUpper, setSaturatedFatUpper] = useState("");
    const [saturatedFatTempUpper, setSaturatedFatTempUpper] = useState("");
    const [sodiumUpper, setSodiumUpper] = useState("");
    const [sodiumTempUpper, setSodiumTempUpper] = useState("");
    const [fatUpper, setFatUpper] = useState("");
    const [fatTempUpper, setFatTempUpper] = useState("");
    const [unsaturatedFatUpper, setUnsaturatedFatUpper] = useState("");
    const [unsaturatedFatTempUpper, setUnsaturatedFatTempUpper] = useState("");
    const [caloriesLower, setCaloriesLower] = useState("");
    const [caloriesTempLower, setCaloriesTempLower] = useState("");
    const [carbsLower, setCarbsLower] = useState("");
    const [carbsTempLower, setCarbsTempLower] = useState("");
    const [cholesterolLower, setCholesterolLower] = useState("");
    const [cholesterolTempLower, setCholesterolTempLower] = useState("");
    const [fiberLower, setFiberLower] = useState("");
    const [fiberTempLower, setFiberTempLower] = useState("");
    const [proteinLower, setProteinLower] = useState("");
    const [proteinTempLower, setProteinTempLower] = useState("");
    const [saturatedFatLower, setSaturatedFatLower] = useState("");
    const [saturatedFatTempLower, setSaturatedFatTempLower] = useState("");
    const [sodiumLower, setSodiumLower] = useState("");
    const [sodiumTempLower, setSodiumTempLower] = useState("");
    const [fatLower, setFatLower] = useState("");
    const [fatTempLower, setFatTempLower] = useState("");
    const [unsaturatedFatLower, setUnsaturatedFatLower] = useState("");
    const [unsaturatedTempLower, setUnsaturatedFatTempLower] = useState("");
    const [comments, setComments] = useState("");
    const [commentsTemp, setCommentsTemp] = useState("");



    const handleCaloriesTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setCaloriesTempUpper(upperNum)
    }
    const handleCarbsTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setCarbsTempUpper(upperNum)
    }
    const handleCholesterolTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setCholesterolTempUpper(upperNum)
    }
    const handleFiberTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setFiberTempUpper(upperNum)
    }
    const handleProteinTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setProteinTempUpper(upperNum)
    }
    const handleSaturatedFatTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setSaturatedFatTempUpper(upperNum)
    }
    const handleSodiumTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setSodiumTempUpper(upperNum)
    }
    const handleFatTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setFatTempUpper(upperNum)
    }
    const handleUnsaturatedFatTempUpper = e => {
        var upperNum = Number((e.target.value).split(" ")[0]);
        setUnsaturatedFatTempUpper(upperNum)
    }

    const handleCaloriesTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setCaloriesTempLower(lowerNum)
    }
    const handleCarbsTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setCarbsTempLower(lowerNum)
    }
    const handleCholesterolTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setCholesterolTempLower(lowerNum)
    }
    const handleFiberTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setFiberTempLower(lowerNum)
    }
    const handleProteinTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setProteinTempLower(lowerNum)
    }
    const handleSaturatedFatTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setSaturatedFatTempLower(lowerNum)
    }
    const handleSodiumTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setSodiumTempLower(lowerNum)
    }
    const handleFatTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setFatTempLower(lowerNum)
    }
    const handleUnsaturatedFatTempLower = e => {
        var lowerNum = Number((e.target.value).split(" ")[0]);
        setUnsaturatedFatTempLower(lowerNum)
    }
    const handleCommentsTemp = e => {
        setCommentsTemp(e.target.value)
    }

    const updateGoals = (newCaloriesL, newCaloriesU, newCarbsL, newCarbsU, newCholesterolL, newCholesterolU, newFiberL, newFiberU , newProteinL, newProteinU, newSaturatedFatL, newSaturatedFatU, newSodiumL, newSodiumU, newFatL, newFatU, newUnsaturatedFatL, newUnsaturatedFatU, newComments) => {
        setCaloriesLower(newCaloriesL);
        console.log(newCaloriesL)
        setCaloriesUpper(newCaloriesU);
        setCarbsLower(newCarbsL);
        setCarbsUpper(newCarbsU);
        setCholesterolLower(newCholesterolL);
        setCholesterolUpper(newCholesterolU);
        setFiberLower(newFiberL);
        setFiberUpper(newFiberU);
        setProteinLower(newProteinL);
        setProteinUpper(newProteinU);
        setSaturatedFatLower(newSaturatedFatL);
        setSaturatedFatUpper(newSaturatedFatU);
        setSodiumLower(newSodiumL);
        setSodiumUpper(newSaturatedFatU);
        setFatLower(newFatL);
        setFatUpper(newFatU);
        setUnsaturatedFatLower(newUnsaturatedFatL);
        setUnsaturatedFatUpper(newUnsaturatedFatU);
        setComments(newComments);
        handleEditGoalsClose();
    }

    const [caloriesMoreOpen, setCaloriesMoreOpen] = React.useState(false);
    const [carbsMoreOpen, setCarbsMoreOpen] = React.useState(false);
    const [cholesterolMoreOpen, setCholesterolMoreOpen] = React.useState(false);
    const [fiberMoreOpen, setFiberMoreOpen] = React.useState(false);
    const [proteinMoreOpen, setProteinMoreOpen] = React.useState(false);
    const [saturatedFatMoreOpen, setSaturatedFatMoreOpen] = React.useState(false);
    const [sodiumMoreOpen, setSodiumMoreOpen] = React.useState(false);
    const [fatMoreOpen, setFatMoreOpen] = React.useState(false);
    const [unsaturatedFatMoreOpen, setUnsaturatedFatMoreOpen] = React.useState(false);

    const handleCaloriesMoreOpen = () => {
        setCaloriesMoreOpen(true);
    }
    const handleCaloriesMoreClose = () => {
        setCaloriesMoreOpen(false);
    }
    const handleCarbsMoreOpen = () => {
        setCarbsMoreOpen(true);
    }
    const handleCarbsMoreClose = () => {
        setCarbsMoreOpen(false);
    }
    const handleCholesterolMoreOpen = () => {
        setCholesterolMoreOpen(true);
    }
    const handleCholesterolMoreClose = () => {
        setCholesterolMoreOpen(false);
    }
    const handleFiberMoreOpen = () => {
        setFiberMoreOpen(true);
    }
    const handleFiberMoreClose = () => {
        setFiberMoreOpen(false);
    }
    const handleProteinMoreOpen = () => {
        setProteinMoreOpen(true);
    }
    const handleProteinMoreClose = () => {
        setProteinMoreOpen(false);
    }
    const handleSaturatedFatMoreOpen = () => {
        setSaturatedFatMoreOpen(true);
    }
    const handleSaturatedFatMoreClose = () => {
        setSaturatedFatMoreOpen(false);
    } 
    const handleSodiumMoreOpen = () => {
        setSodiumMoreOpen(true);
    }
    const handleSodiumMoreClose = () => {
        setSodiumMoreOpen(false);
    }
    const handleFatMoreOpen = () => {
        setFatMoreOpen(true);
    }
    const handleFatMoreClose = () => {
        setFatMoreOpen(false);
    }
    const handleUnsaturatedFatMoreOpen = () => {
        setUnsaturatedFatMoreOpen(true);
    }
    const handleUnsaturatedFatMoreClose = () => {
        setUnsaturatedFatMoreOpen(false);
    }
    
    const [editGoalsOpen, setEditGoalsOpen] = React.useState(false);

    const handleEditGoalsOpen = () => {
        setEditGoalsOpen(true);
    }
    const handleEditGoalsClose = () => {
        setEditGoalsOpen(false);
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
                            <Button
                                variant="contained" 
                                sx={{ backgroundColor: "#cc702d", mt: 3, mb: 2, width: 200 }}
                                onClick={handleEditGoalsOpen}
                            >Edit Goals
                            </Button>
                        </Grid>
                        &nbsp;
                        <Grid>
                            <TableContainer component={Paper} sx={{maxWidth: 1165 }}>
                                <Table sx={{ maxWidth: 1165}} aria-label="simple table">
                                    <TableBody>
                                        <TableRow
                                                key={"Comments"}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {"Comments"}
                                            </TableCell>
                                            <TableCell align="right">{comments}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        &nbsp;
                        <Grid>
                            <TableContainer component={Paper} sx={{ maxWidth: 1165 }}>
                                <Table sx={{ maxWidth: 1165 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><h3> View your goals</h3></TableCell>
                                            <TableCell align="right"><b>Lower bound</b></TableCell>
                                            <TableCell align="right"><b>Upper bound</b></TableCell>
                                            <TableCell align="right"><b>Status</b></TableCell>
                                            <TableCell align="right"><b>View more</b></TableCell>
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
                                            <TableCell data-test="GoalCaloriesLower" align="right">{caloriesLower}</TableCell>
                                            <TableCell data-test="GoalsCaloriesUpper" align="right">{caloriesUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(calories, caloriesLower, caloriesUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleCaloriesMoreOpen}
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
                                            <TableCell align="right">{carbsLower}</TableCell>
                                            <TableCell align="right">{carbsUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(carbs, carbsLower, carbsUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleCarbsMoreOpen}
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
                                            <TableCell align="right">{cholesterolLower}</TableCell>
                                            <TableCell align="right">{cholesterolUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(cholesterol, cholesterolLower, cholesterolUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleCholesterolMoreOpen}
                                            >
                                            </Button>
                                            
                                            }</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Fiber Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Fiber Content"}
                                            </TableCell>
                                            <TableCell align="right">{fiberLower}</TableCell>
                                            <TableCell align="right">{fiberUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(fiber, fiberLower, fiberUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleFiberMoreOpen}
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
                                            <TableCell align="right">{proteinLower}</TableCell>
                                            <TableCell align="right">{proteinUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(protein, proteinLower, proteinUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleProteinMoreOpen}
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
                                            <TableCell align="right">{saturatedFatLower}</TableCell>
                                            <TableCell align="right">{saturatedFatUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(saturatedFat, saturatedFatLower, saturatedFatUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleSaturatedFatMoreOpen}
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
                                            <TableCell align="right">{sodiumLower}</TableCell>
                                            <TableCell align="right">{sodiumUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(sodium, sodiumLower, sodiumUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleSodiumMoreOpen}
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
                                            <TableCell align="right">{fatLower}</TableCell>
                                            <TableCell align="right">{fatUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(fat, fatLower, fatUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleFatMoreOpen}
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
                                            <TableCell align="right">{unsaturatedFatLower}</TableCell>
                                            <TableCell align="right">{unsaturatedFatUpper}</TableCell>
                                            <TableCell align="right">{determineStatus(unsaturatedFat, unsaturatedFatLower, unsaturatedFatUpper)}</TableCell>
                                            <TableCell align="right">{<Button 
                                                sx={{color:'grey'}}
                                                endIcon={<MoreHorizIcon />}
                                                onClick={handleUnsaturatedFatMoreOpen}
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
                <Dialog 
                    open={caloriesMoreOpen}
                    onClose={handleCaloriesMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Calorie Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {calories} kcal.
                            {/* {displayGoal(caloriesLower, caloriesUpper)}
                            Your goal was to have between {caloriesLower} and {caloriesUpper}. */}
                            <div>Sunday: {caloriesWeek[0] + " kcal"}</div> 
                            <div>Monday: {caloriesWeek[1] + " kcal"}</div> 
                            <div>Tuesday: {caloriesWeek[2] + " kcal"}</div> 
                            <div>Wednesday: {caloriesWeek[3] + " kcal"}</div> 
                            <div>Thursday: {caloriesWeek[4] + " kcal"}</div> 
                            <div>Friday: {caloriesWeek[5] + " kcal"}</div> 
                            <div>Saturday: {caloriesWeek[6] + " kcal"}</div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleCaloriesMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    open={carbsMoreOpen}
                    onClose={handleCarbsMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Carbohydrate Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {carbs} g.
                            Your goal was to have between {carbsLower} and {carbsUpper}
                            <div>Sunday: {carbsWeek[0] + " g"}</div> 
                            <div>Monday: {carbsWeek[1] + " g"}</div> 
                            <div>Tuesday: {carbsWeek[2] + " g"}</div> 
                            <div>Wednesday: {carbsWeek[3] + " g"}</div> 
                            <div>Thursday: {carbsWeek[4] + " g"}</div> 
                            <div>Friday: {carbsWeek[5] + " g"}</div> 
                            <div>Saturday: {carbsWeek[6] + " g"}</div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleCarbsMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    open={cholesterolMoreOpen}
                    onClose={handleCholesterolMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Cholesterol Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {cholesterol} mg.
                            Your goal was to have between {cholesterolLower} and {cholesterolUpper}
                            <div>Sunday: {cholesterolWeek[0] + " mg"}</div> 
                            <div>Monday: {cholesterolWeek[1] + " mg"}</div> 
                            <div>Tuesday: {cholesterolWeek[2] + " mg"}</div> 
                            <div>Wednesday: {cholesterolWeek[3] + " mg"}</div> 
                            <div>Thursday: {cholesterolWeek[4] + " mg"}</div> 
                            <div>Friday: {cholesterolWeek[5] + " mg"}</div> 
                            <div>Saturday: {cholesterolWeek[6] + " mg"}</div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleCholesterolMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    open={fiberMoreOpen}
                    onClose={handleFiberMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Fiber Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {fiber} g.
                            Your goal was to have between {fiberLower} and {fiberUpper}
                            <div>Sunday: {fiberWeek[0] + " g"}</div> 
                            <div>Monday: {fiberWeek[1] + " g"}</div> 
                            <div>Tuesday: {fiberWeek[2] + " g"}</div> 
                            <div>Wednesday: {fiberWeek[3] + " g"}</div> 
                            <div>Thursday: {fiberWeek[4] + " g"}</div> 
                            <div>Friday: {fiberWeek[5] + " g"}</div> 
                            <div>Saturday: {fiberWeek[6] + " g"}</div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleFiberMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    open={proteinMoreOpen}
                    onClose={handleProteinMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Protein Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {protein} g.
                            Your goal was to have between {proteinLower} and {proteinUpper}
                            <div>Sunday: {proteinWeek[0] + " g"}</div> 
                            <div>Monday: {proteinWeek[1] + " g"}</div> 
                            <div>Tuesday: {proteinWeek[2] + " g"}</div> 
                            <div>Wednesday: {proteinWeek[3] + " g"}</div> 
                            <div>Thursday: {proteinWeek[4] + " g"}</div> 
                            <div>Friday: {proteinWeek[5] + " g"}</div> 
                            <div>Saturday: {proteinWeek[6] + " g"}</div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleProteinMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    open={saturatedFatMoreOpen}
                    onClose={handleSaturatedFatMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Saturated Fat Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {saturatedFat} g.
                            Your goal was to have between {saturatedFatLower} and {saturatedFatUpper}
                            <div>Sunday: {saturatedFatWeek[0] + " g"}</div> 
                            <div>Monday: {saturatedFatWeek[1] + " g"}</div> 
                            <div>Tuesday: {saturatedFatWeek[2] + " g"}</div> 
                            <div>Wednesday: {saturatedFatWeek[3] + " g"}</div> 
                            <div>Thursday: {saturatedFatWeek[4] + " g"}</div> 
                            <div>Friday: {saturatedFatWeek[5] + " g"}</div> 
                            <div>Saturday: {saturatedFatWeek[6] + " g"}</div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleSaturatedFatMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    open={sodiumMoreOpen}
                    onClose={handleSodiumMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Sodium Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {sodium} mg.
                            Your goal was to have between {sodiumLower} and {sodiumUpper}
                            <div>Sunday: {sodiumWeek[0] + " mg"}</div> 
                            <div>Monday: {sodiumWeek[1] + " mg"}</div> 
                            <div>Tuesday: {sodiumWeek[2] + " mg"}</div> 
                            <div>Wednesday: {sodiumWeek[3] + " mg"}</div> 
                            <div>Thursday: {sodiumWeek[4] + " mg"}</div> 
                            <div>Friday: {sodiumWeek[5] + " mg"}</div> 
                            <div>Saturday: {sodiumWeek[6] + " mg"}</div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleSodiumMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    open={fatMoreOpen}
                    onClose={handleFatMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Fat Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {fat} g.
                            Your goal was to have between {fatLower} and {fatUpper}
                            <div>Sunday: {fatWeek[0] + " g"}</div> 
                            <div>Monday: {fatWeek[1] + " g"}</div> 
                            <div>Tuesday: {fatWeek[2] + " g"}</div> 
                            <div>Wednesday: {fatWeek[3] + " g"}</div> 
                            <div>Thursday: {fatWeek[4] + " g"}</div> 
                            <div>Friday: {fatWeek[5] + " g"}</div> 
                            <div>Saturday: {fatWeek[6] + " g"}</div> 
                        </DialogContentText>
                        <TableContainer component={Paper} sx={{maxWidth: 1163 }}>
                                <Table sx={{ maxWidth: 1163}} aria-label="simple table">
                                    <TableBody>
                                        <TableRow
                                                key={"monday"}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {"Monday"}
                                            </TableCell>
                                            <TableCell align="right">{fat}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleFatMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    open={unsaturatedFatMoreOpen}
                    onClose={handleUnsaturatedFatMoreClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Unsaturated Fat Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This meal plan contains {unsaturatedFat} g.
                            Your goal was to have between {unsaturatedFatLower} and {unsaturatedFatUpper}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleUnsaturatedFatMoreClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={editGoalsOpen}
                    onClose={handleEditGoalsClose}
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Edit your current meal plan goals"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid>
                            <TableContainer component={Paper} sx={{maxWidth: 1163 }}>
                                <Table sx={{ maxWidth: 1163}} aria-label="simple table">
                                    <TableBody>
                                        <TableRow
                                                key={"Comments"}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {"Comments"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={comments} variant="outlined" onChange={handleCommentsTemp} />}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        &nbsp;
                        <Grid>
                            <TableContainer component={Paper} sx={{ maxWidth: 1163 }}>
                                <Table sx={{ maxWidth: 1163 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nutrient</TableCell>
                                            <TableCell align="right">Lower bound</TableCell>
                                            <TableCell align="right">Upper bound</TableCell>
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
                                            <TableCell data-test="GoalCaloriesLower" align="right">{<TextField size="small" id="outlined-basic" label={caloriesLower + " (kcal)"} variant="outlined" onChange={handleCaloriesTempLower} />}</TableCell>
                                            <TableCell data-test="GoalsCaloriesUpper" align="right">{<TextField size="small" id="outlined-basic" label={caloriesUpper + " (kcal)"} variant="outlined" onChange={handleCaloriesTempUpper} />}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Carbohydrate Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Carbohydrate Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={carbsLower + " (g)"} variant="outlined" onChange={handleCarbsTempLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={carbsUpper + " (g)"} variant="outlined" onChange={handleCarbsTempUpper} />}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Cholesterol Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Cholesterol Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={cholesterolLower + " (mg)"} variant="outlined" onChange={handleCholesterolTempLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={cholesterolUpper + " (mg)"} variant="outlined" onChange={handleCholesterolTempUpper} />}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Fiber Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Fiber Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={fiberLower + " (g)"} variant="outlined" onChange={handleFiberTempLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={fiberUpper + " (g)"} variant="outlined" onChange={handleFiberTempUpper} />}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Protein Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Protein Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={proteinLower + " (g)"} variant="outlined" onChange={handleProteinTempLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={proteinUpper + " (g)"} variant="outlined" onChange={handleProteinTempUpper} />}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Saturated Fat Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Saturated Fat Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={saturatedFatLower + " (g)"} variant="outlined" onChange={handleSaturatedFatTempLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={saturatedFatUpper + " (g)"} variant="outlined" onChange={handleSaturatedFatTempUpper} />}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Sodium Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Sodium Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={sodiumLower + " (mg)"} variant="outlined" onChange={handleSodiumTempLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={sodiumUpper + " (mg)"} variant="outlined" onChange={handleSodiumTempUpper} />}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Fat Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Fat Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={fatLower + " (g)"} variant="outlined" onChange={handleFatTempLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={fatUpper + " (g)"} variant="outlined" onChange={handleFatTempUpper} />}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Unsaturated Fat Content"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {"Unsaturated Fat Content"}
                                            </TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={unsaturatedFatLower + " (g)"} variant="outlined" onChange={handleUnsaturatedFatTempLower} />}</TableCell>
                                            <TableCell align="right">{<TextField size="small" id="outlined-basic" label={unsaturatedFatUpper + " (g)"} variant="outlined" onChange={handleUnsaturatedFatTempUpper} />}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                    <Button sx={{color: "gray"}} onClick={handleEditGoalsClose}>
                            cancel
                        </Button>
                        <Button onClick={()=> updateGoals(caloriesTempLower, caloriesTempUpper, carbsTempLower, carbsTempUpper, cholesterolTempLower, cholesterolTempUpper, fiberTempLower, fiberTempUpper, proteinTempLower, proteinTempUpper, saturatedFatTempLower, saturatedFatTempUpper, sodiumTempLower, sodiumTempUpper, fatTempLower, fatTempUpper, unsaturatedTempLower, unsaturatedFatTempUpper, commentsTemp)} autoFocus>
                            update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );

    function displayGoal(lower, upper) {
        if (lower == "" && upper == "") {
            return (
                <div>
                    This goal was not defined.
                </div>
            )
        }
    }

    function determineStatus(amount, lower, upper) {
        if (lower == "" && upper == "") {
            return (
                <div>
                    <HorizontalRuleIcon 
                        sx={{color:'grey'}}
                    >
                    </HorizontalRuleIcon>
                </div>
            )
        }
        if (upper < lower) {
            return (
                <div>
                  <PriorityHighIcon
                    sx={{color:'red'}}
                    >
                    </PriorityHighIcon>  
                </div>
            )
        }
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