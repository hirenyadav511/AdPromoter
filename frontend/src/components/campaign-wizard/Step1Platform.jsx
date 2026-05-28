import { motion } from 'framer-motion';
import { Search, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const platforms = [
  { id: 'Google', name: 'Google Search', icon: Search, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'Facebook', name: 'Facebook Ads', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'Instagram', name: 'Instagram Stories', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
  { id: 'LinkedIn', name: 'LinkedIn Sponsored', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'Twitter', name: 'Twitter / X', icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20' },
];

export default function Step1Platform({ formData, handleChange, onNext }) {
  const handleSelect = (platformId) => {
    handleChange({ target: { name: 'platform', value: platformId } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Choose Platform</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Select the primary network for this campaign.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const isSelected = formData.platform === platform.id;
          const Icon = platform.icon;
          
          return (
            <div
              key={platform.id}
              onClick={() => handleSelect(platform.id)}
              className={`cursor-pointer rounded-xl p-5 border transition-colors relative flex items-center gap-4 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${platform.bg}`}>
                <Icon className={`w-6 h-6 ${platform.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{platform.name}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={onNext}
          disabled={!formData.platform}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </motion.div>
  );
}
