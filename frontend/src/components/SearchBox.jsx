import React, { useState } from "react";
import Dropdown from "./Dropdown"; 

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(""); 

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim() !== "" || type) {
      onSearch(query, type);
    } else {
      alert("Please enter a search query or select a type.");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Search questions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
      />

      <Dropdown
        options={["MCQ", "ANAGRAM", "READ_ALONG", "CONTENT_ONLY"]}
        placeholder="Select Type"
        onSelect={(selectedOption) => setType(selectedOption)} 
      />

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
