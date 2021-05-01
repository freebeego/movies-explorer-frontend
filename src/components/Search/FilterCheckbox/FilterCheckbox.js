import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox({ isShortFilm, handleSwitchPositionChange }) {
  return (
    <label className="switch">
      <div className="switch__container">
        <input
          onChange={handleSwitchPositionChange}
          checked={isShortFilm}
          className="switch__input"
          type="checkbox"
        />
        <span className="switch__slider" />
      </div>
      <span className="switch__label-text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
