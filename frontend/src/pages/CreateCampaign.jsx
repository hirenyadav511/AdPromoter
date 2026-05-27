import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import AILoader from '../components/ai/AILoader';
import AIResultCard from '../components/ai/AIResultCard';
import AIScoreCard from '../components/ai/AIScoreCard';
import AISuggestions from '../components/ai/AISuggestions';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'Google',
    budget: '',
    duration: '',
    audience: '',
    tone: 'Professional',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAIGenerate = async () => {
    if (!formData.audience || !formData.tone || !formData.platform) {
      return toast.error('Please fill Target Audience, Tone, and Platform first.');
    }

    try {
      setAiLoading(true);
      // Clear previous results to trigger entry animations again
      setAiResults(null); 
      
      const { data } = await axios.post('/api/ai/generate-campaign', {
        audience: formData.audience,
        tone: formData.tone,
        platform: formData.platform,
      });

      setAiResults(data);
      toast.success('AI Campaign generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate content. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAI = () => {
    if (!aiResults) return;
    
    // Auto-fill the actual form inputs with AI data
    const extendedDescription = `${aiResults.description}\n\nCall To Action: ${aiResults.cta || ''}\nHashtags: ${(aiResults.hashtags || []).join(' ')}\nSEO Keywords: ${(aiResults.seoKeywords || []).join(', ')}`;

    setFormData((prev) => ({
      ...prev,
      title: aiResults.title,
      description: extendedDescription.trim(),
    }));
    
    toast.success('AI content applied to form!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error('Please upload a media file');
    }

    try {
      setLoading(true);

      const uploadData = new FormData();
      uploadData.append('media', file);

      const uploadRes = await axios.post('/api/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const mediaUrl = uploadRes.data.url;

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
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Design your campaign and let AI supercharge your ad copy.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Setup */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              1. AI Generation Setup
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Target Platform</label>
                <select
                  name="platform"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
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
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Target Audience</label>
                <input
                  type="text"
                  name="audience"
                  placeholder="e.g. College Students"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                  value={formData.audience}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Campaign Tone</label>
                <select
                  name="tone"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                  value={formData.tone}
                  onChange={handleChange}
                >
                  <option value="Professional">Professional</option>
                  <option value="Modern">Modern</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Funny">Funny</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Creative">Creative</option>
                </select>
              </div>

              <motion.button
                type="button"
                onClick={handleAIGenerate}
                disabled={aiLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] text-white rounded-lg px-4 py-3 font-bold hover:bg-right transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                {aiLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {aiResults ? 'Regenerate AI Content' : 'Generate With AI'}
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Actual Submission Form */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">2. Finalize & Launch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Campaign Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Final Title"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  placeholder="Final Ad Copy"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Upload Media</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  required
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 focus:outline-none transition-all"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    required
                    min="1"
                    placeholder="500"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    name="duration"
                    required
                    min="1"
                    placeholder="30"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg px-4 py-3 font-bold hover:bg-gray-800 dark:hover:bg-gray-200 shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : 'Launch Campaign'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: AI Results Dashboard */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {aiLoading ? (
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AILoader />
              </motion.div>
            ) : aiResults ? (
              <motion.div 
                key="results" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="space-y-4"
              >
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Studio Output</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Review, copy, or apply these generated assets.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApplyAI}
                    className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors"
                  >
                    Apply To Form <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-4">
                    <AIResultCard title="Campaign Title" content={aiResults.title} />
                    <AIResultCard title="Ad Description" content={aiResults.description} />
                    <AIResultCard title="Call To Action" content={aiResults.cta} />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <AIResultCard title="Hashtags" content={aiResults.hashtags} isArray={true} />
                      <AIResultCard title="SEO Keywords" content={aiResults.seoKeywords} isArray={true} />
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 space-y-4">
                    <AIScoreCard scores={aiResults.scores} />
                    <AISuggestions suggestions={aiResults.suggestions} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">AI Studio Awaiting Input</h3>
                <p className="text-gray-500 dark:text-gray-500 max-w-sm text-sm">
                  Configure your target audience and tone on the left, then click Generate to watch the magic happen.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;
