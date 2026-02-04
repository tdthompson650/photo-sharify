import Link from 'next/link';
import { Suspense } from 'react';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export const metadata = {
    title: 'All Meals',
    description: 'Browse all meals shared by our community.',
  };

async function Meals(){
    const meals = await getMeals();
    return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
    return <>
        <header className={classes.header}>
            <h1>Delicious meals, created <span className={classes.highlight}>by you!</span></h1>
            <p>Share your favorite recipes with our community and discover new dishes from others.</p>
            <p className={classes.cta}>
                <Link href="/meals/share">Share a Meal</Link>
            </p>
        </header>
        <main className={classes.main}>
            {/* Shows fallback when meals are loading */}
            <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                <Meals />
            </Suspense>
        </main>
    </>
}