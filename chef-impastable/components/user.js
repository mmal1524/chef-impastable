import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const currUser = "63efbd6587c0903e01a19bc6";

export default class User {
    constructor(displayName, username, profilePicture, friends, friendRequests) {
        this.displayName = displayName;
        this.username = username;
        this.profilePicture = profilePicture;
        this.friends = friends;
        this.friendRequests = friendRequests;
    }

    getInitials() {
        var words = this.displayName.split(' ');
        var initials = "";
        words.forEach(function(word) {
            initials += word[0];
        });
        return initials;
    }

    displayLarge() {
        return (
            <>
                {/* Stack to display user's profile picture, display name, and username */}
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    {/* Profile Picture, if no url, displays user's initials */}
                    <Avatar 
                        sx={{width: 85, height: 85}} 
                        alt={this.displayName} 
                        src={this.profilePicture} 
                    >
                        {this.getInitials()}
                    </Avatar>
                    {/* Displays user's display name and username next to profile picture */}
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={0}
                    >
                        <h1 className="displayName">{this.displayName}</h1>
                        <h3 className="username">{this.username}</h3>
                    </Stack>

                </Stack>

                <style jsx>{`
                    .displayName {
                        margin: 0px;
                    }
                    .username {
                        margin: 0px;
                    }
                `}</style>
            </>

        );
    }

    displaySmall() {
        return (
            <Box sx={{margin: 1, marginLeft: 0}}>
                {/* Stack to display user's profile picture, display name, and username */}
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    {/* Profile Picture, if no url, displays user's initials */}
                    <Avatar 
                        sx={{width: 40, height: 40}} 
                        alt={this.displayName} 
                        src={this.profilePicture} 
                    >
                        {this.getInitials()}
                    </Avatar>
                    {/* Displays user's display name and username next to profile picture */}
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={0}
                    >
                        <h3 className="displayName">{this.displayName}</h3>
                        <h5 className="username">{this.username}</h5>
                    </Stack>

                </Stack>

                <style jsx>{`
                    .displayName {
                        margin: 0px;
                    }
                    .username {
                        margin: 0px;
                    }
                `}</style>
            </Box>

        );
    }

    displayFriends() {
        for (let i = 0; i < this.friends.length; i++) {
            this.friends[i].displaySmall();
        }
    }
}