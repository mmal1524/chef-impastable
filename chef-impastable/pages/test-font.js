import { Oswald } from '@next/font/google';
import clsx from 'clsx';

export const text = Oswald({
    subsets: ['latin'],
    weight: ['400'],
});

export default function font() {
    
    return(
        <div>
            <p className={clsx(text.className)}>
                Oswald
            </p>
        </div>
    );
}