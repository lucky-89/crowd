import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CertificateModal from './CertificateModel';

const stripePromise = loadStripe('pk_test_51NtE3uSJVQqn8HuYUkVGtNNexLXiCRaTLg7uImyHKJh1StZLP9UQWOTdKflqO2ZpUwJeimAvHfRYB5PBN9ZKBJsE00kh2Riack');

function Donate() {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    postal_code: '',
    country: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [donationDetails, setDonationDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`https://crowdfunding-tjhr.onrender.com/api/getCampaign/${id}`);
        const data = await response.json();
        setCampaign(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        setError('Campaign not found.');
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
        setError('Please enter a valid donation amount.');
        return;
    }

    if (!stripe || !elements) {
        return; // Stripe.js has not yet loaded.
    }

    try {
        const response = await fetch(`https://crowdfunding-tjhr.onrender.com/api/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: donationAmount,
                name,
                email,
                address,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const { clientSecret } = data;

            // Use Stripe.js to handle the payment with card details
            const cardElement = elements.getElement(CardElement);

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name,
                        email,
                        address: {
                            line1: address.line1,
                            city: address.city,
                            postal_code: address.postal_code,
                            country: address.country,
                        },
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                // Donation successful
                setDonationDetails({
                    name,
                    amount: donationAmount,
                    email,
                });

                const saveResponse = await fetch(`https://crowdfunding-tjhr.onrender.com/api/campaign/${id}/donate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        address,
                        amount: donationAmount,
                    }),
                });

                if (!saveResponse.ok) {
                    setError('Failed to save donation details.');
                    return;
                }

                setShowCertificate(true); 
                setError('');
                setSuccess('Thank you for your donation!');
            }
        } else {
            setError('Error initiating payment.');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        setError('Error processing payment.');
    }
};



  if (loading) {
    return <p>Loading campaign...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-4">Donate to {campaign.title}</h2>
      <p className="text-center text-gray-700 mb-6">{campaign.description}</p>

      <form onSubmit={handleDonate} className="max-w-lg mx-auto">

        <div className="mb-4">
          <label htmlFor="Name" className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Phone" className="block text-gray-700 font-medium mb-2">
            Mobile No.
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Address Line 1
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postal_code}
            onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="donationAmount" className="block text-gray-700 font-medium mb-2">
            Donation Amount (in $)
          </label>
          <input
            type="number"
            id="donationAmount"
            name="donationAmount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <CardElement className="p-3 border rounded-md" />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-800 transition-all"
        >
          Donate
        </button>
      </form>

      {showCertificate && <CertificateModal donation={donationDetails} campaign={campaign} />}
    </div>
  );
}

const DonateWrapper = () => (
  <Elements stripe={stripePromise}>
    <Donate />
  </Elements>
);

export default DonateWrapper;
