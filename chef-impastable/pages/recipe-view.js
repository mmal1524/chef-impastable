import * as React from 'react';
import Typography from '@mui/material/Typography';
import clientPromise from '../lib/mongodb_client';
import Grid from '@mui/material/Grid';
import { ObjectId } from 'mongodb';
import Navbar from './navbar.js'
import { Button, CardMedia } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import AddFromRec from '../components/add-ingredient-from-recipe.js';

export default function Recipe({ recipe }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#ffc107",
            },
        },
    });

    function createRow(name, value) {
        return { name, value };
    }
    console.log(JSON.stringify(recipe.nutrients.calories));

    const nutritionRows = [
        createRow('Calories', recipe.nutrients.calories),
        createRow('Carbohydrate Content', recipe.nutrients.carbohydrateContent),
        createRow('Cholesterol Content', recipe.nutrients.cholesterolContent),
        createRow('Fiber Content', recipe.nutrients.fiberContent),
        createRow('Protein Content', recipe.nutrients.proteinContent),
        createRow('Saturated Fat Content', recipe.nutrients.saturatedFatContent),
        createRow('Sodium Content', recipe.nutrients.sodiumContent),
        createRow('Fat Content', recipe.nutrients.fatContent),
        createRow('Unsaturated Fat Content', recipe.nutrients.unsaturatedFatContent),
    ];

    const [stateRecipeTags, setStateRecipeTags] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            var data = await AddTag(recipe.title, null, null, null, false);
            setStateRecipeTags(data.tags);
        };
        if (recipe.tags === undefined) {
            //if the recipe tags are undefined, must be initialized 
            fetchData();
        } else {
            setStateRecipeTags(recipe.tags)
        }
    }, [])

    const [updateCount, setUpdateCount] = useState(0);
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleClick = async (index) => {
        const updatedTag = {
            ...stateRecipeTags[index],
            exists: !stateRecipeTags[index].exists,
        };
        const updatedTags = [
            ...stateRecipeTags.slice(0, index),
            updatedTag,
            ...stateRecipeTags.slice(index + 1),
        ];
        setStateRecipeTags(updatedTags);
        await AddTag(recipe.title, updatedTag.tag, updatedTag.exists, true);
    };

    return (
        <>
            <Grid>
                <div className="App">
                    <Navbar />
                </div>
                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Dietary Tags</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                {stateRecipeTags && stateRecipeTags.map((tag, index) => (
                                    <Fab variant="extended" size="medium" color={(stateRecipeTags[index].exists) ? "primary" : ""} aria-label="add" onClick={async () => handleClick(index)} theme={theme} key={index + updateCount}>
                                        {tag.tag}
                                    </Fab>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>


                </div>
                <Grid container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <Grid item
                        sx={{width: 200}}
                    ></Grid>
                    <Grid item
                        //display="flex"
                        //justifyContent="center"
                        //alignItems="center"
                    >
                        <h1>{recipe.title}</h1>
                    </Grid>
                    <Grid item
                        sx={{
                            pt:2,
                        }}
                    >
                        <Button 
                            //justifyContent='left'
                            sx={{
                                width: 200
                            }}
                            onClick={ async() => {AddFromRec(recipe.ingredients)}}
                        >
                            Add to Shopping List
                        </Button>
                    </Grid>
                </Grid>
                <Grid container
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <CardMedia>
                        <img src={recipe.image} alt="image of {props.recipe.title}" width={300} />
                    </CardMedia>
                </Grid>
                <Grid container
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <p>Prep time: {recipe.prep_time} minutes, Total time: {recipe.total_time} minutes, Yields: {recipe.yields} </p>
                </Grid>
                <div>
                    <h2>
                        Instructions
                    </h2>
                    {recipe.instructions_list.map((instruction) => (
                        <ul>
                            <li>{instruction}</li>
                        </ul>
                    ))}
                    <h2>
                        Ingredients
                    </h2>
                    {recipe.ingredients.map(ingredient => (
                        <ul>
                            <li>{ingredient.ingredient}, quantity: {ingredient.quantity}, measurement: {ingredient.measurement}</li>
                        </ul>
                    ))}
                    <h2>
                        Nutrition Facts
                    </h2>

                    <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
                        <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nutrients</TableCell>
                                    <TableCell align="middle">Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {nutritionRows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="middle">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Grid>
        </>
    );
}

async function AddTag(title, tag, exists, isDefined) {
    try {
        const res = await fetch('/api/recipeAddTags', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                tag: tag,
                exists: exists,
                isDefined: isDefined
            })
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        return error;
    }
}

export async function getServerSideProps(context) {
    console.log("query: " + context.query)
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const recipe = await db
            .collection("recipes")
            .findOne(new ObjectId(`${context.query.id}`));
        return {
            props: { recipe: JSON.parse(JSON.stringify(recipe)) },
        };
    }
    catch (e) {
        console.error(e);
    }
}


