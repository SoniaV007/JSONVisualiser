import React, { useState } from 'react'

const SearchBar = ({ onSearch, theme, toggleTheme, onDownload }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if(searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='searchBarContainer'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Search by path (e.g., $.user.name or $.items[0])'
        className='searchInput'
      />
      <button onClick={handleSearch} className='searchButton'>
        Search
      </button>
      <button onClick={onDownload} className='downloadButton'>
        Download
      </button>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  )
}

export default SearchBar
