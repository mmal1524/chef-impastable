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

function FridgeGroup(props) {
    return (
        <Card sx={{width:200}} variant="outlined">
            <CardActionArea>
                <CardHeader title={props.group.name} sx={{fontSize:10}}>
                </CardHeader>
                     
                <CardContent sx={{overflow: "auto"}}>
                    <List>
                        {props.group.ingredients.map((ingredient, index) => (
                            <ListItem key={text}>
                                <ListItemButton>
                                    <ListItemText primary={text} />
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