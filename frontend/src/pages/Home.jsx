import React, { useState, useEffect } from "react";
import axios from "../api/api";
import SearchBox from "../components/SearchBox";
import QuestionList from "../components/QuestionList";
import QuestionDetail from "../components/QuestionDetail";

const Home = () => {

  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState(""); 
  const [error, setError] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleSearch = async (query, type) => {
    setSearchQuery(query); 
    setFilterType(type); 
    setCurrentPage(1); 

    try {
      const response = await axios.get("/search", {
        params: {
          query,
          type,
          page: 1,
          limit: 10,
        },
      });
      
      console.log(response);
      
      setResults(response.data.results);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        console.error("Error fetching search results:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const fetchPaginatedResults = async () => {
    try {
      const response = await axios.get("/search", {
        params: {
          query: searchQuery,
          type: filterType,
          page: currentPage,
          limit: 10,
        },
      });
      setResults(response.data.results);
    } catch (error) {
      if (error.response?.data.error) {
        setError(error.response.data.error);
      } else {
        console.error("Error fetching search results:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (searchQuery || filterType) {
      fetchPaginatedResults();
    }
  }, [currentPage]);

  const handlePagination = (direction) => {

    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }

  };

  const handleSelectQuestion = async (id) => {
    try {

      const response = await axios.get(`/questions/${id}`);
      setSelectedQuestion(response.data);

    } catch (error) {

      if (error.response?.data.error) {
        setError(error.response.data.error);
      } else {
        console.error("Error fetching question details:", error);
        alert("An unexpected error occurred. Please try again.");
      }    
    }
  };

  const handleCloseDetail = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="home">
      <SearchBox onSearch={handleSearch} />

      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {!selectedQuestion ? (
        <QuestionList results={results} handlePage={handlePagination} currentPage={currentPage}  totalPages={totalPages}  onSelectQuestion={handleSelectQuestion} />
      ) : (
        <QuestionDetail question={selectedQuestion} onClose={handleCloseDetail} />
      )}
    
    </div>
  );
};

export default Home;
