import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';


const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS ={
  method: 'GET',
  headers:{
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [serchTerm,setSearchTerm] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading,setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(()=>setDebouncedSearchTerm(serchTerm), 500,[serchTerm]);

  const fetchMovies = async (query='')=>{
    setLoading(true);
    setErrorMessage('');
    try{
        const endpoint = query? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint,API_OPTIONS);

        if(!response.ok){
          throw new Error('Failed to fetch data...')
        }

        const data = await response.json();
        if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

        setMovieList(data.results || []);
    } catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.')
    } finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper' >
        <header>
          <img src='./hero.png' alt='Hero Banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hussle</h1>
          <SearchBar serchTerm={serchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (<Spinner/>): errorMessage ? (<p className='text-red-500'>{errorMessage}</p>): (
            <ul>
              {movieList.map((movie)=>(
                <li>
                  <MovieCard key={movie.id} movie={movie}/>
                </li>
              ))}
            </ul>
          )}
        </section>
       
      </div>
    </main>
  )
}

export default App