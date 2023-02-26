import Link from 'next/link';
import Router from 'next/router';
//import withRouter from 'next/router';
//import { useRouter } from 'next/router';
import clientPromise from '../lib/mongodb_client';
//import { Types } from 'mongoose';
//import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export default function Recipe({recipe}) {
    console.log(" recipe:")
    console.log(recipe)
    return (
        <>
            <h1>{recipe.title}</h1>
            <h2>
                <Link href="/homepage">Back to home</Link>
            </h2>
        </>
    );
}

export async function getServerSideProps(context) {
    console.log("query: " + context.query)
    try {
        const client = await clientPromise;
        const db = client.db("test");
        console.log("id: " + context.query.id)
        //console.log(mongoose.Types.ObjectId(`${context.query.id}`))
        //console.log(Types.ObjectId(`${context.query.id}`))
        console.log(ObjectId(`${context.query.id}`))
        const recipe = await db
            .collection("recipes")
            .findOne(new ObjectId(`${context.query.id}`));
        console.log("recipe: " + JSON.parse(JSON.stringify(recipe)));
        return {
            props: {recipe: JSON.parse(JSON.stringify(recipe))},
        };
    }
    catch (e) {
        console.error(e);
    }
    
}

