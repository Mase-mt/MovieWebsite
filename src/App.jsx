import React, { useState } from 'react'
import SearchBar from './components/SearchBar'


const App = () => {
  const [serchTerm,setSearchTerm] = useState('');
  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hussle</h1>
        </header>
        <SearchBar serchTerm={serchTerm} setSearchTerm={setSearchTerm}/>
        <h1 className='text-white'>{serchTerm}</h1>
       
      </div>
    </main>
  )
}

export default App