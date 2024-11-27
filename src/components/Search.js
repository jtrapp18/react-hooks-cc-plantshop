import React from "react";

function Search({searchInput, setSearchInput}) {

  function handleChange(event) {
    setSearchInput(prevSearch=>event.target.value);
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input 
        value={searchInput}
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
