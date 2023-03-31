import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export function reviewCard(review, index) {

    var firstStar = false;
    var secondStar = false;
    var thirdStar = false;
    var fourthStar = false; 
    var fifthStar = false;

    switch(review.rating) {
        case 1:
            firstStar = true;
            break;
        case 2:
            firstStar = true;
            secondStar = true;
            break;
        case 3:
            firstStar = true;
            secondStar = true;
            thirdStar = true;
            break;
        case 4:
            firstStar = true;
            secondStar = true;
            thirdStar = true;
            fourthStar = true;
            break;
        case 5:
            firstStar = true;
            secondStar = true;
            thirdStar = true;
            fourthStar = true;
            fifthStar = true;
            break;
    }

    return (
        <Box data-test={`Review-${index}`} sx={{margin: 2, padding: 1, border: 1}}>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={0}
            >
                <Stack
                    data-test="Stars"
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <Box>
                        {firstStar ? 
                            <StarIcon sx={{width: 20, height: 20}}/> 
                            : <StarOutlineIcon sx={{width: 20, height: 20}}/>}
                    </Box>
                    <Box>
                        {secondStar ? 
                            <StarIcon sx={{width: 20, height: 20}}/> 
                            : <StarOutlineIcon sx={{width: 20, height: 20}}/>}
                    </Box>
                    <Box>
                        {thirdStar ? 
                            <StarIcon sx={{width: 20, height: 20}}/> 
                            : <StarOutlineIcon sx={{width: 20, height: 20}}/>}
                    </Box>
                    <Box>
                        {fourthStar ? 
                            <StarIcon sx={{width: 20, height: 20}}/> 
                            : <StarOutlineIcon sx={{width: 20, height: 20}}/>}
                    </Box>
                    <Box>
                        {fifthStar ? 
                            <StarIcon sx={{width: 20, height: 20}}/> 
                            : <StarOutlineIcon sx={{width: 20, height: 20}}/>}
                    </Box>
                </Stack>
                <h4 data-test="author" className="author">author: {review.author}</h4>
                <p></p>
                <body2 data-test="description">{review.description}</body2>

            </Stack>

            <style jsx>{`
                .author {
                    margin: 0px;
                }
            `}</style>

        </Box>
    );
}