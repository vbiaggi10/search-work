import React from 'react';
// import searchIcon from '../assets/icons/search.svg';

interface Props {
  value: string;
  handleChange: any;
}

const SearchBar: React.FC<Props> = ({ handleChange, value }) => {
  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        type="text"
        name=""
        id=""
        placeholder="Buscar"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
