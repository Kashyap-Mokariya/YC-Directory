import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Author, Startup } from '@/sanity/types'
import DetailsButton from './ui/details-button'

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {

  const { _createdAt, views, category, author, title, _id, image, description } = post
  const authorId = author?._id;
  const authorName = author?.name;

  return (
    <li className='startup-card group'>
      <div className="flex-between" suppressHydrationWarning>
        <p>
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'> {views} </span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className='text-16-medium line-clamp-1' >
              {authorName}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>
              {title}
            </h3>
          </Link>
        </div>

        <Link href={`/user/${authorId}`}>
          <Image src={"https://placehold.co/600x400"} alt="placeholder" width={48} height={48} className='rounded-full' />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>
          {description}
        </p>
        <Image src={image || "https://placehold.co/1080x1080"} alt="img" width={1080} height={1080} className='startup-card_img mt-3' />
        {/* <img src={image} alt="img" className='startup-card_img' /> This is also acceptable (without optimization) */}
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-medium'>
            {category}
          </p>
        </Link>
        <Link href={`/startup/${_id}`}>
          <DetailsButton>
            Details
          </DetailsButton>
        </Link>
      </div>
    </li>
  )
}

export default StartupCard
