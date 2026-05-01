import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'Google',
    budget: '',
    duration: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error('Please upload a media file');
    }

    try {
      setLoading(true);

      // 1. Upload file to Cloudinary
      const uploadData = new FormData();
      uploadData.append('media', file);

      const uploadRes = await axios.post('/api/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const mediaUrl = uploadRes.data.url;

      // 2. Create campaign
      await axios.post('/api/campaigns', {
        ...formData,
        mediaUrl,
      });

      toast.success('Campaign created successfully!');
      navigate('/campaigns');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/campaigns" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-2 inline-block font-medium">
          &larr; Back to Campaigns
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create New Campaign</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in the details below to launch your advertising campaign.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 max-w-2xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Campaign Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Summer Sale Blast"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              required
              rows="3"
              placeholder="What is this campaign about?"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Upload Media (Image/Video)</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*,video/*"
                required
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 focus:outline-none transition-all"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Platform</label>
            <select
              name="platform"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
              value={formData.platform}
              onChange={handleChange}
            >
              <option value="Google">Google Search</option>
              <option value="Facebook">Facebook Ads</option>
              <option value="Instagram">Instagram Stories</option>
              <option value="Twitter">Twitter / X</option>
              <option value="LinkedIn">LinkedIn Sponsored</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Budget ($)</label>
              <input
                type="number"
                name="budget"
                required
                min="1"
                placeholder="0"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Duration (Days)</label>
              <input
                type="number"
                name="duration"
                required
                min="1"
                placeholder="0"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-indigo-600 text-white rounded-lg px-8 py-3 font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all disabled:bg-indigo-400 disabled:shadow-none flex items-center justify-center min-w-[160px]"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </>
              ) : 'Launch Campaign'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;
