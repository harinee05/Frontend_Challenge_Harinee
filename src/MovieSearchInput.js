import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Autocomplete from './Autocomplete'; // Assuming Autocomplete is extracted to a separate component
import './App.css';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000',
  },
  '& .MuiRating-iconEmpty': {
    color: 'black',
    border: '1px #000',
  },
});

const MovieSearchInput = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setShowAutocomplete(searchTerm.length > 0 || selectedRatings.length > 0 || selectedGenres.length > 0);
  }, [searchTerm, selectedRatings, selectedGenres]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setShowAutocomplete(true);
  };

  const handleRatingChange = (event) => {
    const { value, checked } = event.target;
    const ratingValue = Number(value);

    if (checked) {
      setSelectedRatings([...selectedRatings, ratingValue]);
    } else {
      setSelectedRatings(selectedRatings.filter((rating) => rating !== ratingValue));
    }
  };

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedGenres([...selectedGenres, value.toLowerCase()]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value.toLowerCase()));
    }
  };

  return (
    <div className="header">
      <div className="autocomplete-container">
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          onChange={handleSearchTermChange}
          onFocus={handleInputFocus}
          placeholder="Enter movie name"
        />
        {showAutocomplete && (
          <Autocomplete
            movies={movies}
            searchTerm={searchTerm}
            selectedRatings={selectedRatings}
            selectedGenres={selectedGenres}
          />
        )}
      </div>
      <div className="dropdowns">
        <div className="dropdown">
          <button onClick={() => setRatingDropdownOpen(!ratingDropdownOpen)}>
            Rating
            {ratingDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {ratingDropdownOpen && (
            <div className="dropdown-content show">
              {[...Array(10).keys()].map((i) => (
                <label key={i + 1}>
                  <input
                    type="checkbox"
                    value={i + 1}
                    onChange={handleRatingChange}
                    checked={selectedRatings.includes(i + 1)}
                  />
                  <StyledRating value={i + 1} readOnly max={10} precision={0.5} size="small" />
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="dropdown">
          <button onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}>
            Genre
            {genreDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {genreDropdownOpen && (
            <div className="dropdown-content show">
              {['Action', 'Comedy', 'Drama', 'Thriller'].map((genre) => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    value={genre}
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes(genre.toLowerCase())}
                  />
                  {genre}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSearchInput;
