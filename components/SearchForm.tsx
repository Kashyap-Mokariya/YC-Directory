import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import Link from 'next/link'
import { Search } from 'lucide-react'

const SearchForm = ({ query }: {
  query?: string
}) => {

  return (
    <Form action={"/"} scroll={false} className='search-form'>
      <input className='search-input' name='query' defaultValue={query} placeholder='Search Startups' />

      <div className="flex gap-2">
        <SearchFormReset />

        <button type='submit' className='search-btn text-white'>
          <Search />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
