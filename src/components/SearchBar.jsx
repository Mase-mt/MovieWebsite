import React from 'react'

const SearchBar = ({serchTerm,setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src='search.svg' alt='search'/>
            <input
            type='text'
            placeholder='Search through thousands of movies...'
            value={serchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}/>
        </div>
    </div>
  )
}

export default SearchBar