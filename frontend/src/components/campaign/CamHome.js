import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Nav';
import Footer from '../Footer';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function CamHome() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [donations, setDonations] = useState({});

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://crowdfunding-tjhr.onrender.com/api/getCampaign');
        const data = await response.json();
        setCampaigns(data);
        data.forEach((campaign) => {
          fetchDonations(campaign._id);
        });
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const fetchDonations = async (campaignId) => {
    try {
      const response = await fetch(`https://crowdfunding-tjhr.onrender.com/api/doner/${campaignId}`);
      const donationData = await response.json();
      const totalRaised = donationData.reduce((acc, donation) => acc + donation.amount, 0);

      setDonations((prevDonations) => ({
        ...prevDonations,
        [campaignId]: totalRaised,
      }));
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-center mb-8">All Campaigns</h2>
        {campaigns.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-8">
            {campaigns.map((campaign) => {
              const raisedAmount = donations[campaign._id] || 0;
              const completionPercentage = (raisedAmount / campaign.goal) * 100;
              const isCompleted = completionPercentage >= 100 || new Date(campaign.deadline) < new Date();
              const shareUrl = `${window.location.origin}/campaign/${campaign._id}`; // URL to share
              const shareTitle = `Support this Campaign: ${campaign.title}`;

              return (
                <li
                  key={campaign._id}
                  className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 transition-transform transform hover:scale-105"
                  onClick={() => setSelectedCampaignId(campaign._id)}
                >
                  <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                  <p className="text-gray-700 mb-4">{campaign.description}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Category:</span> {campaign.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Goal:</span> ${campaign.goal}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Deadline:</span> {new Date(campaign.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Amount Raised:</span> ${raisedAmount}
                  </p>
                  <p className="text-blue-600 mb-2">
                    <a
                      href={`https://crowdfunding-tjhr.onrender.com/${campaign.media}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-800"
                    >
                      Gov. Authorized License
                    </a>
                  </p>
                  <p className="text-blue-600">
                    <a
                      href={`https://crowdfunding-tjhr.onrender.com/${campaign.media1}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-800"
                    >
                      Campaign Banner
                    </a>
                  </p>

                  <div className="flex justify-between">
                    <button
                      className={`btn border px-3 py-1 rounded-md ${
                        isCompleted
                          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-800 hover:scale-110'
                      } my-3`}
                      disabled={isCompleted}
                      onClick={() => navigate(`/donate/${campaign._id}`)}
                    >
                      {isCompleted ? 'Campaign Completed' : 'Donate'}
                    </button>

                    <button
                      className="btn border px-3 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-800 hover:scale-110 my-3"
                      onClick={() => navigate(`/doner/${campaign._id}`)}
                    >
                      Doner
                    </button>
                  </div>

                  <div className="mt-4">
                  <p className="text-sm font-semibold mb-2">Share this Campaign:</p>
<div className="flex gap-2">
  <FacebookShareButton url={shareUrl} quote={shareTitle}>
    <div className="bg-blue-600 text-white p-2 rounded-full hover:scale-110">
      <FaFacebookF className="text-xl" />
    </div>
  </FacebookShareButton>
  <TwitterShareButton url={shareUrl} title={shareTitle}>
    <div className="bg-blue-400 text-white p-2 rounded-full hover:scale-110">
      <FaTwitter className="text-xl" />
    </div>
  </TwitterShareButton>
  <WhatsappShareButton url={shareUrl} title={shareTitle}>
    <div className="bg-green-500 text-white p-2 rounded-full hover:scale-110">
      <FaWhatsapp className="text-xl" />
    </div>
  </WhatsappShareButton>
  <EmailShareButton url={shareUrl} subject={shareTitle}>
    <div className="bg-gray-600 text-white p-2 rounded-full hover:scale-110">
      <FaEnvelope className="text-xl" />
    </div>
  </EmailShareButton>
</div>

                  </div>

                  <p className="my-4">{completionPercentage.toFixed(2)}%</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No campaigns found</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CamHome;
