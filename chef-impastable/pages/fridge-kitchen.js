import Link from 'next/link';

export default function Kitchen() {
    return (
        <>
            <h1>This will be the Fridge/Kitchen page</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </>
    );
}