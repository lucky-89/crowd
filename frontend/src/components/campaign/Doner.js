import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Doner() {
  const { id } = useParams();  
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const campaignResponse = await fetch(`https://crowdfunding-tjhr.onrender.com/api/getCampaign/${id}`);
        const campaignData = await campaignResponse.json();
        setCampaign(campaignData);

        const donationResponse = await fetch(`https://crowdfunding-tjhr.onrender.com/api/doner/${id}`);
        const donationData = await donationResponse.json();

        setDonations(donationData);
      } catch (error) {
        setError(`Error loading campaign or donations: ${error.message}`);
      } 
    };
  
    fetchCampaign();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className='text-center'>
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-50 to-indigo-50 shadow-xl rounded-xl p-8">
  {campaign ? (
    <>
      <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-6">{campaign.title}</h2>
      <p className="text-center text-gray-600 text-lg mb-10">{campaign.description}</p>
    </>
  ) : (
    <p className="text-center text-gray-500 text-lg">Loading campaign details...</p>
  )}

  <h3 className="text-3xl font-bold text-center text-purple-700 mb-6">Our Generous Donors</h3>

  {donations.length === 0 ? (
    <p className="text-center text-gray-600">No donations yet for this campaign.</p>
  ) : (
    <ul className="divide-y divide-gray-300">
      {donations.map((donation) => (
        <li key={donation._id} className="py-4 flex justify-between items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 my-3">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-semibold text-gray-800">{donation.name}</div>
          </div>
          <div className="text-lg text-indigo-600 font-semibold">
            ${donation.amount}
            {donation.email && (
              <span className="text-gray-500 text-sm ml-2 block">({donation.email})</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  )}
</div>
  <p className='text-xl font-bold text-green-400 my-2'>Your generosity makes a difference—thank you for your support!</p>


</div>
  );
}

export default Doner;
