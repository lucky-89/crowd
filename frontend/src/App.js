import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BackgroundVideo from './components/BackgroundVideo';
import CamHome from './components/campaign/CamHome';
import SearchPage from './components/SearchResults'; 
import './index.css';
import Login from './components/campaign/Users/Login';
import Signup from './components/campaign/Users/Signup';
import CreateCampaign from './components/campaign/CreateCamp';
import Donate from './components/campaign/Donate';
import Doner from './components/campaign/Doner';
import Contact from './components/Contact';
import CampaignDetails from './components/campaign/CampaignDetails';

const stripePromise = loadStripe('pk_test_51NtE3uSJVQqn8HuYUkVGtNNexLXiCRaTLg7uImyHKJh1StZLP9UQWOTdKflqO2ZpUwJeimAvHfRYB5PBN9ZKBJsE00kh2Riack');

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BackgroundVideo />} />
        <Route path="/campaign" element={<CamHome />} />
        <Route path="/search" element={<SearchPage />} /> {/* Add search route */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/services' element={<CreateCampaign />} />
        <Route 
          path="/donate/:id" 
          element={
            <Elements stripe={stripePromise}>
              <Donate />
            </Elements>
          } 
        />
        <Route path='/doner/:id' element={<Doner />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
