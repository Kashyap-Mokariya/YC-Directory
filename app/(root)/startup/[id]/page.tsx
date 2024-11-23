import { formatDate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import markdownit from "markdown-it"
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'
import StartupCard, { StartupTypeCard } from '@/components/StartupCard'
import { auth } from '@/auth'
import DeleteButton from '@/components/ui/delete-button'

export const experimental_ppr = true

const Page = async ({ params }: {
  params: Promise<{ id: string }>
}) => {

  const session = await auth()

  const md = markdownit()

  const id = (await params).id

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' })
  ])

  const { _createdAt, views, category, author, title, _id, image, description, pitch } = post
  const authorId = author?._id;
  const authorImage = author?.image;
  const authorName = author?.name;
  const authorUsername = author?.username;

  if (!post)
    return notFound()

  const parsedContent = md.render(pitch || '')

  return (
    <>
      <section className='pink_container !min-h-[230px] !important'>
        <p className='tag'>
          {formatDate(_createdAt)}
        </p>

        <h1 className='heading'>
          {title}
        </h1>

        <p className='sub-heading !max-w-5xl'>
          {description}
        </p>
      </section>

      <section className='section_container'>
        <img src={post?.image} alt="thumbnail" className='w-full h-auto rounded-xl' />

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link href={`/user/${authorId}`} className='flex gap-2 items-center mb-3'>
              <div className="w-16 h-16 rounded-full overflow-hidden drop-shadow-lg !important">
                <Image
                  src={authorImage}
                  alt='avatar'
                  width={74}
                  height={74}
                />
              </div>

              <div>
                <p className='text-20-medium'>
                  {authorName}
                </p>

                <p className='text-16-medium !text-black-300 !important'>
                  @{authorUsername}
                </p>
              </div>
            </Link>

            <p className='category-tag'>
              {category}
            </p>
          </div>

          <h3 className='text-30-bold'>
            Pitch Details
          </h3>

          {
            parsedContent ?
              (<article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />) :
              (
                <p className='no-result'>
                  No details provided
                </p>
              )
          }

          {/* {
            session?.id == authorId ? (
              <DeleteButton />
            ) : "Invalid"
          } */}

          <hr className='divider' />

          {editorPosts.length > 0 &&
            (
              <div className='max-w-4xl mx-auto'>
                <p className='text-30-semibold'>
                  Editor Picks
                </p>

                <ul className='mt-7 card_grid-sm'>
                  {editorPosts.map((post: StartupTypeCard, i: number) => (
                    <StartupCard key={i} post={post} />
                  ))}
                </ul>

              </div>
            )
          }

          <Suspense fallback={<Skeleton className='view_skeleton' />}>
            <View id={id} />
          </Suspense>

        </div>
      </section>

    </>
  )
}

export default Page
