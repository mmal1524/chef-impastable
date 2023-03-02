import {Card, CardHeader, CardContent, CardMedia} from "@mui/material";
import Image from "next/image";
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import withRouter from "next/router";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

function FridgeGroup(props) {
    console.log(props)
    return (
        <Card sx={{width:200}} variant="outlined">
            <CardActionArea>
                <CardHeader title={props.name} sx={{fontSize:10}}>
                </CardHeader>
                     
                <CardContent sx={{overflow: "auto"}}>
                    <List>
                        {props.ingredients.map((ingredient, index) => (
                            <ListItem key={ingredient}>
                                <ListItemButton>
                                    <ListItemText primary={ingredient} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </CardActionArea>
        </Card>
    );
    
}
export default FridgeGroup;