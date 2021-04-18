import './Search.css';
import React from 'react';

function Search() {
  const [input, setInput] = React.useState('');

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="search">
      <input type="text" value={input} onChange={handleChange} placeholder="Фильм" className="search__input"/>
      <button type="submit" className="search__submit" />
      <label className="search__switch">
        <div className="search__switch-container">
          <input className="search__switch-input" type="checkbox" />
          <span className="search__switch-slider"/>
        </div>
        <span className="search__switch-label-text">Короткометражки</span>
      </label>
    </form>
  );
}

export default Search;
