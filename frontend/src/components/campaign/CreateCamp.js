import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
  const [userEmail, setUserEmail] = useState('');
  const [canCreateCampaign, setCanCreateCampaign] = useState(false);
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    media: null,
    goal: '',
    deadline: '',
    media1: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('https://crowdfunding-tjhr.onrender.com/api/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setUserEmail(data.email);
        if (data.email && data.email.endsWith('knit.ac.in')) {
          setCanCreateCampaign(true);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.media) newErrors.media = 'Government Certificate is required';
    if (!formData.goal || formData.goal < 1) newErrors.goal = 'Goal must be greater than zero';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (new Date(formData.deadline) <= new Date()) newErrors.deadline = 'Deadline must be in the future';
    if (!formData.media1) newErrors.media1 = 'Media upload is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('You must be logged in to create a campaign.');
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://crowdfunding-tjhr.onrender.com/api/campaigns', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formDataToSend,
      });
      if (response.status === 401) throw new Error('Unauthorized. Please log in again.');
      await response.json();
      alert('Campaign created successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        media: null,
        goal: '',
        deadline: '',
        media1: null
      });
      navigate("/campaign");
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-campaign text-center my-10">
      {!canCreateCampaign ? (
        <p>You need a verified knit.ac.in email to create a campaign.</p>
      ) : (
        <form onSubmit={handleSubmit} className='border rounded-lg shadow-lg w-3/5 mx-auto my-8 text-start px-10 py-8 bg-yellow-50'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Create a New Campaign</h2>

          <div className='mb-4'>
            <label className='font-bold text-lg'>Campaign Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className='border rounded-md p-2 w-full mt-1' />
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
          </div>

          <div className='mb-4'>
            <label className='font-bold text-lg'>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className='border rounded-md p-2 w-full mt-1 h-32' />
            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
          </div>

          <div className='mb-4'>
            <label className='font-bold text-lg'>Category:</label>
            <select name="category" value={formData.category} onChange={handleChange} className='border rounded-md p-2 w-full mt-1'>
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Art">Art</option>
              <option value="Community">Community</option>
              <option value="Animal">Animal Charity</option>
              <option value="Orphanage">Orphanage</option>
              <option value="Food">Food Charity</option>
              <option value="Disaster">Disaster Charity</option>
            </select>
            {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
          </div>

          <div className='mb-4'>
            <label className='font-bold text-lg'>Government Approved Certificate:</label>
            <input
              type="file"
              name="media"
              className='mt-1 border rounded-md p-2 w-full'
              onChange={handleChange}
            />
            {errors.media && <div className="text-red-500 text-sm mt-1">{errors.media}</div>}
          </div>

          <div className='mb-4'>
            <label className='font-bold text-lg'>Funding Goal:</label>
            <input type="number" name="goal" value={formData.goal} onChange={handleChange} className='border rounded-md p-2 w-full mt-1' />
            {errors.goal && <div className="text-red-500 text-sm mt-1">{errors.goal}</div>}
          </div>

          <div className='mb-4'>
            <label className='font-bold text-lg'>Deadline:</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className='border rounded-md p-2 w-full mt-1' />
            {errors.deadline && <div className="text-red-500 text-sm mt-1">{errors.deadline}</div>}
          </div>

          <div className='mb-4'>
            <label className='font-bold text-lg'>Upload Media (Image/Video):</label>
            <input
              type="file"
              name="media1"
              className='mt-1 border rounded-md p-2 w-full'
              onChange={handleChange}
            />
            {errors.media1 && <div className="text-red-500 text-sm mt-1">{errors.media1}</div>}
          </div>

          <button type="submit" disabled={isSubmitting} className={`mt-6 w-full bg-blue-600 text-white font-bold py-2 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
            {isSubmitting ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateCampaign;
