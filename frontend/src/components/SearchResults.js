import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query') || '';
    setQuery(queryParam);

    // Fetch search results
    if (queryParam) {
      fetchSearchResults(queryParam);
    } else {
      setLoading(false); // No query means no results
    }
  }, [location.search]);

  // Fetch search results from the API
  const fetchSearchResults = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await fetch(`https://crowdfunding-tjhr.onrender.com/api/search?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results.');
      }
      const data = await response.json();
      setResults(data.results || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !results.length && <p>No results found for "{query}".</p>}
      <ul className="space-y-4">
        {results.map((result, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{result.title}</h2>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
