import {Card, CardHeader, CardContent, CardMedia} from "@mui/material";
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendIcon from '@mui/icons-material/Send';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import withRouter from "next/router";

import { useState, useEffect } from "react";

function HouseCard( props ) {
    //https://nextjs.org/docs/api-reference/next/link
    //https://stackoverflow.com/questions/55182529/next-js-router-push-with-state
    const router = useRouter();

    const [household, setHousehold] = useState({name: "", members: []});

    useEffect(() => {
        //console.log(props.householdId)
        async function getHouse() {
            var i = await getHouseholdFromID(props.householdId);
            setHousehold(i);
        }
        getHouse();
    }, []);

    async function getHouseholdFromID(householdID) {
        //console.log(user_id);
        const res = await fetch('/api/getHouseholds', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: householdID,
                getData: true,
            })
        })
        const data = await res.json();
        console.log(data);
        return data;
    }

    return (
        <Card sx={{width:200}} variant="outlined">
            <CardActionArea data-test={`Recipe-${props.index}`} 
                //onClick={() => {Router.push({pathname:"/household/", query: {id: props.recipe._id, username: JSON.parse(localStorage.getItem("user")).username }})}}
            >
                <CardHeader title={household.name} sx={{fontSize:10}}>
                </CardHeader>
                      
                <CardContent sx={{overflow: "auto"}}>
                    {household.members}
                </CardContent>
            </CardActionArea>
    </Card>
    );

}

export default HouseCard;