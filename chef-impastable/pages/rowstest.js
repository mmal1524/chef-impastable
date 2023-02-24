import * as React from 'react';
import { nanoid } from 'nanoid';
import clientPromise from "../lib/mongodb";
import { useState } from "react";
import Rows from "../components/rows"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const users = await db.collection("users").find({}).toArray();
        return {
            props: { users: JSON.parse(JSON.stringify(users)) },
        };
    }
    catch (e) {
        console.log("error")
        console.error(e);
    }
}

export default function Home({ users }) {

    const [username, setUsername] = useState(users);
    const [addFormData, setAddFormData] = useState({
        username: ''
    });

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            id: nanoid(),
            fullName: addFormData.username
        }

        const newUsers = [...users, newUser]
        setUsername(newUsers);
    }

    return (
        
            <div className="app-container">
                {username.map((user, index) => (
                    <Rows user={user} />

                    /* <div key={index}>
                         <h3>{user.username} - {user.password}</h3>
                     </div>*/
                ))}
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Passsword</th>
                            <th>DisplayName</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>placeholdername</td>
                            <td>placeholderpass</td>
                            <td>placeholderdisplay</td>
                        </tr>
                    </tbody>
                </table>
                <h2>Add a contact</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input type="text" name="username" required="required" placeholder='enter a username' onChange={handleAddFormChange}></input>
                    <button type="submit">Add</button>
                </form>
            </div>
    );
}