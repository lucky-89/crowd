import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CampaignDetails = () => {
  const { id } = useParams(); // Extract ID from URL
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`https://crowdfunding-tjhr.onrender.com/api/getCampaign/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch campaign details");
        }
        const data = await response.json();
        setCampaign(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) 
    return <div className="flex justify-center items-center h-screen"><p className="text-lg font-semibold text-gray-600">Loading...</p></div>;

  if (error) 
    return <div className="flex justify-center items-center h-screen"><p className="text-lg font-semibold text-red-500">Error: {error}</p></div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{campaign?.title || "Untitled Campaign"}</h1>
      <p className="text-gray-700 mb-6 leading-relaxed">{campaign?.description || "No description available."}</p>

      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-gray-800">Goal:</p>
          <p className="text-lg font-semibold text-gray-600">
            ${campaign?.goal ? campaign.goal.toLocaleString() : "N/A"}
          </p>
          <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Category:</span> {campaign.category}
        </p>
        <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Deadline:</span> {new Date(campaign.deadline).toLocaleDateString()}
        </p>
        </div>
        
      </div>

      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200" onClick={()=> navigate(`/donate/${id}`) }>
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default CampaignDetails;
