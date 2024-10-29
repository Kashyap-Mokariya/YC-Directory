import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const StartupCard = ({ post }: { post: StartupCardType }) => {

  const { _createdAt, views, author: { _id: authorId, name }, category, title, _id, image, description } = post

  return (
    <li className='startup-card group'>
      <div className="flex-between">
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
              {name}
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

      <Link href={`/user/${authorId}`}>
        <p>
          {description}
          <Image src={image} alt="img" width={1080} height={1080} className='startup-card_img' />
          {/* <img src={image} alt="img" className='startup-card_img' /> This is also acceptable (without optimization) */}
        </p>
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className='text-16-medium'>
            {category}
          </p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/user/${authorId}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard
