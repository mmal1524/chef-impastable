import Link from 'next/link';
import Router from 'next/router';
import withRouter from 'next/router';
import { useRouter } from 'next/router';

export default function Recipe({recipe}) {

    return (
        <>
            <h1>This will be the Recipe page</h1>
            <h2>
                <Link href="/homepage">Back to home</Link>
            </h2>
        </>
    );
}

export async function getServerSideProps() {
    const router=useRouter();
    //console.log(router.query)
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const recipes = await db
            .collection("recipes")
            .findOne({_id: router.query.id});
        console.log(recipe);
        return {
            props: {recipe: JSON.parse(JSON.stringify(recipes))},
        };
    }
    catch (e) {
        console.error(e);
    }
    
}

