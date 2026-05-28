import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

// Wizard Components
import WizardProgress from '../components/campaign-wizard/WizardProgress';
import Step1Platform from '../components/campaign-wizard/Step1Platform';
import Step2Details from '../components/campaign-wizard/Step2Details';
import Step3AIGeneration from '../components/campaign-wizard/Step3AIGeneration';
import Step4ReviewAI from '../components/campaign-wizard/Step4ReviewAI';
import Step5Settings from '../components/campaign-wizard/Step5Settings';
import Step6ReviewLaunch from '../components/campaign-wizard/Step6ReviewLaunch';

const CreateCampaign = () => {
  const navigate = useNavigate();
  
  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    platform: 'Google',
    audience: '',
    tone: '',
    goal: '',
    budget: '',
    duration: '',
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleAIGenerate = async () => {
    try {
      setAiLoading(true);
      setAiResults(null); 
      
      const { data } = await axios.post('/ai/generate-campaign', {
        audience: formData.audience,
        tone: formData.tone,
        platform: formData.platform,
        goal: formData.goal, // Include goal
      });

      setAiResults(data);
      
      // Auto-populate generated info to formData for final submission
      const extendedDescription = `${data.description}\n\nCall To Action: ${data.cta || ''}\nHashtags: ${(data.hashtags || []).join(' ')}\nSEO Keywords: ${(data.seoKeywords || []).join(', ')}`;
      setFormData((prev) => ({
        ...prev,
        title: data.title,
        description: extendedDescription.trim(),
      }));
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate content. Please try again.');
      // If error, maybe go back to step 2?
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      return toast.error('Please upload a media file');
    }

    try {
      setLoading(true);

      const uploadData = new FormData();
      uploadData.append('media', file);

      const uploadRes = await axios.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const mediaUrl = uploadRes.data.url;

      await axios.post('/campaigns', {
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

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Platform formData={formData} handleChange={handleChange} onNext={nextStep} />;
      case 2:
        return <Step2Details formData={formData} handleChange={handleChange} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <Step3AIGeneration aiLoading={aiLoading} aiResults={aiResults} handleAIGenerate={handleAIGenerate} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <Step4ReviewAI aiResults={aiResults} onNext={nextStep} onPrev={prevStep} handleAIGenerate={handleAIGenerate} />;
      case 5:
        return <Step5Settings formData={formData} handleChange={handleChange} file={file} setFile={setFile} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <Step6ReviewLaunch formData={formData} aiResults={aiResults} file={file} onPrev={prevStep} onSubmit={handleSubmit} loading={loading} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/campaigns" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-2 inline-block font-medium">
          &larr; Back to Campaigns
        </Link>
      </div>

      <div className="max-w-5xl mx-auto pb-12">
        <WizardProgress currentStep={currentStep} />
        
        <div className="relative mt-8">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;
