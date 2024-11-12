import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { unstable_after as after } from 'next/server'
import { writeClient } from '@/sanity/lib/write-client'
import { auth } from '@/auth'

const View = async ({ id }: { id: string }) => {

    const session = await auth()
    const userId = session?.id
    console.log(userId)

    const { views: totalViews, userVisits } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id })

    const hasUserVisited = userId && userVisits?.includes(userId);

    if (!hasUserVisited && userId) {
        after(async () => {
            // Update views and add user ID to the visited list
            await writeClient
                .patch(id)
                .set({ views: totalViews + 1 })
                .insert('after', 'userVisits[-1]', [userId])  // Ensure 'userVisits' is an array field in Sanity
                .commit()
        })
    }

    const getViewsText = (count: number) => {
        return count === 1 ? 'view' : 'views'
    }

    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping />
            </div>

            <p className='view-text'>
                <span className='font-black'>
                    {totalViews} {getViewsText(totalViews)}
                </span>
            </p>
        </div>
    )
}

export default View
