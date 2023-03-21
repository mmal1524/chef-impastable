import {Card, CardHeader, CardContent, CardMedia} from "@mui/material";
import Image from "next/image";
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendIcon from '@mui/icons-material/Send';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import withRouter from "next/router";

function RecipeCard(props) {
    //https://nextjs.org/docs/api-reference/next/link
    //https://stackoverflow.com/questions/55182529/next-js-router-push-with-state
    const router = useRouter();

    return (
        <Card sx={{width:200}} variant="outlined">
            <CardActionArea onClick={() => {Router.push({pathname:"/recipe-view/", query: {id: props.recipe._id, title: props.recipe.title, author: props.recipe.author, ingredients: props.recipe.ingredients, instructions: props.recipe.instructions_list, nutrients: props.recipe.nutrients}})}}>
                <CardHeader title={props.recipe.title} sx={{fontSize:10}}>
                </CardHeader>
                
                <CardMedia>
                    <img src={props.recipe.image} alt="image of {props.recipe.title}" width={200} /> 
                </CardMedia>           
                <CardContent sx={{overflow: "auto"}}>
                    {props.recipe.description}  
                </CardContent>
            </CardActionArea>
        <CardActions>
            <IconButton>
                <FavoriteBorderOutlinedIcon />
            </IconButton>
            <IconButton>
                <SendIcon />
            </IconButton>
        </CardActions>
    </Card>
    );
    
}
export default RecipeCard;