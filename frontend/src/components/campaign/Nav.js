import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Pass the search query in the URL
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <a href="/campaign">
            <img
              src="https://th.bing.com/th/id/OIP.TZDOyQjDIl5-qMWjk5n8pAHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7"
              className="w-10 h-10 rounded-full mx-2 sm:mx-10"
              alt="Logo"
            />
          </a>
        </div>

        {/* Search Bar for Desktop */}
        <div className="hidden md:flex flex-grow mx-4 items-center space-x-2">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={!isOpen ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'}
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-3 text-white`}>
          <a href="/" className="block py-2 px-3 hover:bg-gray-700 rounded">
            Home
          </a>
          <a href="/services" className="block py-2 px-3 hover:bg-gray-700 rounded">
            Create Campaign
          </a>
          <a href="/login" className="block py-2 px-3 hover:bg-gray-700 rounded">
            Login
          </a>
          <a href="/contact" className="block py-2 px-3 hover:bg-gray-700 rounded">
            Contact
          </a>
        </div>
      </div>

      {/* Mobile Search */}
      {isOpen && (
        <div className="md:hidden px-4 py-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
