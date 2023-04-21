import {Card, CardHeader, CardContent} from "@mui/material";
import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {CardActionArea, CardActions, IconButton} from '@mui/material';

function FridgeGroup(props) {
    return (
        <Card sx={{width:200}} variant="outlined">
            <CardHeader title={props.name} sx={{fontSize:10}}>
            </CardHeader>
                    
            <CardContent sx={{overflow: "auto"}}>
                <List dense={true}>
                    {props.ingredients.map((ingredient, index) => (
                        <ListItem 
                            key={ingredient}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={async () => {
                                        var data = await deleteIngredient(props.username, ingredient, props.name);
                                        localStorage.setItem('user', JSON.stringify(data));
                                        debugger;
                                        props.delete();
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                }>
                            <ListItemText primary={ingredient} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
    
}

async function deleteIngredient(username, ingredient, group) {
    try {
        const res = await fetch('/api/deleteIngredientFromFridge', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                ingredient: ingredient,
                group: group
            })
        })
        const data = await res.json();
        return data;
    } catch {
        return "error"
    }
}

export default FridgeGroup;