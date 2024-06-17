import React, { useState } from 'react';
import Autocomplete from './Autocomplete';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
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

const MovieSearchInput = ({
  movies,
  showAutocomplete,
  searchTerm,
  selectedRatings,
  selectedGenres,
  onSearchInputClick,
  onSearchTermChange,
  onRatingChange,
  onGenreChange,
}) => {
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [anyRatingChecked, setAnyRatingChecked] = useState(false);
  const [anyGenreChecked, setAnyGenreChecked] = useState(false);

  const handleRatingChange = (event) => {
    const { value, checked } = event.target;
    const ratingValue = Number(value);

    if (checked && ratingValue === 0) {
      setAnyRatingChecked(true);
      onRatingChange([]);
    } else if (checked && ratingValue !== 0) {
      setAnyRatingChecked(false);
      const updatedRatings = [...selectedRatings, ratingValue];
      onRatingChange(updatedRatings);
    } else {
      setAnyRatingChecked(false);
      const updatedRatings = selectedRatings.filter((rating) => rating !== ratingValue);
      onRatingChange(updatedRatings);
    }
  };

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;

    if (value === 'Any Genre') {
      setAnyGenreChecked(checked);
      onGenreChange(checked ? [] : selectedGenres);
    } else {
      if (checked) {
        onGenreChange([...selectedGenres, value.toLowerCase()]);
      } else {
        onGenreChange(selectedGenres.filter((g) => g !== value.toLowerCase()));
      }
    }
  };

  return (
    <div className="header">
      <div className="autocomplete-container">
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchTermChange}
          onClick={onSearchInputClick}
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
              <label key="any-rating">
                <input
                  type="checkbox"
                  value={0}
                  onChange={handleRatingChange}
                  checked={anyRatingChecked}
                />
                Any Rating
              </label>
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
              <label key="any-genre">
                <input
                  type="checkbox"
                  value="Any Genre"
                  onChange={handleGenreChange}
                  checked={anyGenreChecked}
                />
                Any Genre
              </label>
              {['Action', 'Comedy', 'Drama', 'Thriller'].map((genre) => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    value={genre}
                    onChange={(e) =>
                      onGenreChange(
                        e.target.checked
                          ? [...selectedGenres, e.target.value.toLowerCase()]
                          : selectedGenres.filter((g) => g !== e.target.value.toLowerCase())
                      )
                    }
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
