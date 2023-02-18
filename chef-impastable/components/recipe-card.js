import {Card, CardHeader, CardContent} from "@mui/material";
import Image from "next/image";
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

function RecipeCard(props) {
    

    return (
        <Card sx={{height:300, width:200}} variant="outlined">
            <CardActionArea>
                <CardHeader title={props.recipe.title}/>
                <Image src={"/chef-impastable-logo.jpg"} width={100} height={50} />            
                <CardContent sx={{overflow: "auto", height: 100}}>
                    {props.recipe.description}  
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton>
                    <FavoriteBorderOutlinedIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
    
}
export default RecipeCard;