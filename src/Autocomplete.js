import React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000',
  },
  '& .MuiRating-iconEmpty': {
    color: 'black',
    border: '1px #000',
  },
});

const Autocomplete = ({ movies, searchTerm, selectedRatings, selectedGenres }) => {
  const filterMovies = () => {
    return movies.filter((movie) => {
      const matchesSearchTerm =
        searchTerm.length === 0 || movie.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => movie.rating >= rating && movie.rating < rating + 1);

      const matchesGenres =
        selectedGenres.length === 0 || selectedGenres.includes(movie.genre.toLowerCase());

      return matchesSearchTerm && matchesRating && matchesGenres;
    });
  };

  const filteredMovies = filterMovies();

  return (
    <div className="autocomplete-dropdown">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <div key={movie.id} className="autocomplete-item">
            <div className="genre_title">
              <span>{movie.genre}</span>
            </div>
            <div className="movie_title">
              <span>{movie.title}</span>
            </div>
            <div>
              <StyledRating value={movie.rating} readOnly max={10} precision={0.5} size="small" />
            </div>
          </div>
        ))
      ) : (
        <div className="autocomplete-item">
          {searchTerm.length > 0 ? 'No results found' : 'Showing all movies'}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
