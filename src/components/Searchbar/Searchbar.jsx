import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import './Searchbar.scss';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => setSearchQuery(e.currentTarget.value);

  return (
    <header className="Searchbar">
      <form
        className="SearchForm"
        onSubmit={e => {
          onSubmit(e, searchQuery);
        }}
      >
        <button type="submit" className="SearchForm-button">
          {/* <span className="SearchForm-button-label"></span> */}
          <FcSearch className="SearchIcon" />
        </button>

        <input
          name="searchQuery"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
