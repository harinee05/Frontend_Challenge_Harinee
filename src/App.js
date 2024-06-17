import React, { useState } from 'react';
import MovieSearchInput from './MovieSearchInput';

const moviesData = [
  { id: 1, title: 'The Matrix', rating: 7.5, genre: "Action" },
  { id: 2, title: 'Focus', rating: 6.9, genre: "Comedy" },
  { id: 3, title: 'The Lazaurus Effect', rating: 6.4, genre: "Thriller" },
  { id: 4, title: 'Everly', rating: 5.0, genre: "Action" },
  { id: 5, title: 'Maps to the stars', rating: 7.5, genre: "Drama" },
];

const App = () => {
  const [movies, setMovies] = useState(moviesData);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleSearchInputClick = () => {
    setShowAutocomplete(true);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRatingChange = (ratings) => {
    setSelectedRatings(ratings);
  };

  const handleGenreChange = (genres) => {
    setSelectedGenres(genres);
  };

  return (
    <div className="App">
      <MovieSearchInput
        movies={movies}
        showAutocomplete={showAutocomplete}
        searchTerm={searchTerm}
        selectedRatings={selectedRatings}
        selectedGenres={selectedGenres}
        onSearchInputClick={handleSearchInputClick}
        onSearchTermChange={handleSearchTermChange}
        onRatingChange={handleRatingChange}
        onGenreChange={handleGenreChange}
      
      />
    </div>
  );
};

export default App;
