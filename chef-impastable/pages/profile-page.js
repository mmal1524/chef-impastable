import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ProfilePage() {

    var user = {
        displayName: 'Sarah Wagler',
        username: 'sawagler',
        profilePicture: "",
    }

    function getInitials(name) {
        var words = name.split(' ');
        var initials = "";
        words.forEach(function(word) {
            initials += word[0];
        });
        console.log(initials);
        return initials;
    }

    return (
        <>
            <div>

                <Grid container spacing={1}>
                    <Grid xs>
                        {/* Stack to display profile picture, display name, and username */}
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={3}
                        >
                            {/* Profile Picture, if no url, displays user's initials */}
                            <Avatar 
                                sx={{width: 85, height: 85}} 
                                alt={user.displayName} 
                                src={user.profilePicture} 
                            >
                                {getInitials(user.displayName)}
                            </Avatar>
                            {/* Displays user's display name and username next to profile picture */}
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={0}
                            >

                                <h1 className="h1">{user.displayName}</h1>
                                <h3 className="h3">{user.username}</h3>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid xs={2}>
                        <Button variant="outlined" startIcon={<SettingsIcon />}>
                            Edit Profile
                        </Button>
                    </Grid>
                </Grid>

                <style jsx>{`
                    .h1 {
                        margin: 0px;
                    }
                    .h3 {
                        margin: 0px;
                    }
                `}</style>

            </div>
            
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </>
    );
}