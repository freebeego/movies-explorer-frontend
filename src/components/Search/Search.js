import './Search.css';
import React from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function Search({ handleSubmit, query, handleChange, isShortFilm, handleSwitchPositionChange }) {
  return (
    <form onSubmit={ handleSubmit } className="search">
      <input type="text" value={ query } onChange={ handleChange } placeholder="Фильм" className="search__input"/>
      <button type="submit" className="search__submit" />
      <FilterCheckbox isShortFilm={isShortFilm} handleSwitchPositionChange={handleSwitchPositionChange} />
    </form>
  );
}

export default Search;
