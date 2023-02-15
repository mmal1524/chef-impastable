import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

export default function ProfilePage() {
    return (
        <>
            <div>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="baseline"
                    spacing={3}
                >
                    <Avatar sx={{width: 85, height: 85}}>SW</Avatar>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={0}
                    >

                        <h1 className="h1">Sarah Wagler</h1>
                        <h3 className="h3">sawagler</h3>

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