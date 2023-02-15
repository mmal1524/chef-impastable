import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

export default function ProfilePage() {

    var user = {
        displayName: 'Sarah Wagler',
        username: 'sawagler',
        profilePicture: "",
    }

    function imageExists(url) {
        const img = new Image();
        img.src = url;
        if (img.complete) { return true; }
        return false;
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
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    
                    <Avatar 
                        sx={{width: 85, height: 85}} 
                        alt={user.displayName} 
                        src={user.profilePicture} 
                    >
                        {getInitials(user.displayName)}
                    </Avatar>

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