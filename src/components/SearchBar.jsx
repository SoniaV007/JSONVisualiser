import React, { useState, useRef, useEffect } from 'react'

const SearchBar = ({ onSearch, theme, toggleTheme, onDownload, nodes }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if(value.trim() && nodes.length > 0) {
      const allPaths = nodes.map(node => node.data.path);
      const filtered = allPaths.filter(path =>
        path.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSearch = (path = searchQuery) => {
    if(path.trim()) {
      onSearch(path.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      if(selectedIndex >= 0 && suggestions[selectedIndex]) {
        setSearchQuery(suggestions[selectedIndex]);
        handleSearch(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if(e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if(e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if(e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (path) => {
    setSearchQuery(path);
    handleSearch(path);
  };

  return (
    <div className='searchBarContainer'>
      <div className='searchWrapper' ref={searchRef}>
        <input
          type='text'
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if(suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder='Search by path (e.g., $.user.name or $.items[0])'
          className='searchInput'
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className='suggestions'>
            {suggestions.map((path, index) => (
              <div
                key={path}
                className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSuggestionClick(path)}
              >
                {path}
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => handleSearch()} className='searchButton'>
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
