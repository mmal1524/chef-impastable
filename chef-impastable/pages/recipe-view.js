import clientPromise from '../lib/mongodb_client';
import Grid from '@mui/material/Grid';
import { ObjectId } from 'mongodb';
import Navbar from './navbar.js'
import { CardMedia } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Recipe({ recipe }) {
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
    return (
        <>
            <Grid>
                <div className="App">
                    <Navbar />
                </div>
                <Grid container
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <h1>{recipe.title}</h1>
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

