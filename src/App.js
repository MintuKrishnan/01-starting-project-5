import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
let content = '';
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/films');

      if (!response.ok) {
        throw new Error('Data Fetch Error');
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (movies.length === 0) {
    content = <h1>No Movies Found</h1>;
  }

  if (error) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1>Loading....</h1>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

/* {!isLoading && error && <h1>{error}</h1>}
        {isLoading && { content }}
        {!error && !isLoading && movies.length === 0 && (
          <h1>No Movies Found</h1>
        )}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />} */

// const dummyMovies = [
//   {
//     id: 1,
//     title: 'Some Dummy Movie',
//     openingText: 'This is the opening text of the movie',
//     releaseDate: '2021-05-18',
//   },
//   {
//     id: 2,
//     title: 'Some Dummy Movie 2',
//     openingText: 'This is the second opening text of the movie',
//     releaseDate: '2021-05-19',
//   },
// ];

// function fetchMoviesHandler() {
//   fetch('https://swapi.dev/api/films/')
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.results);
//     });
// }
