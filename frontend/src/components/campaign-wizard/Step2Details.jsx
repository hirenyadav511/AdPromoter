import { motion } from 'framer-motion';
import { Target, MessageCircle, TrendingUp } from 'lucide-react';

const goals = [
  { id: 'Brand Awareness', label: 'Brand Awareness' },
  { id: 'Lead Generation', label: 'Lead Generation' },
  { id: 'Website Traffic', label: 'Website Traffic' },
  { id: 'Sales', label: 'Sales' },
];

const tones = [
  'Professional', 'Modern', 'Friendly', 'Luxury', 'Funny', 'Urgent', 'Creative'
];

export default function Step2Details({ formData, handleChange, onNext, onPrev }) {
  const isValid = formData.audience && formData.tone && formData.goal;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Campaign Details</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Tell us who you're targeting and what you want to achieve.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            <Target className="w-4 h-4 text-purple-500" /> Target Audience
          </label>
          <input
            type="text"
            name="audience"
            placeholder="e.g. College Students interested in tech"
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none transition-all"
            value={formData.audience}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-500" /> Campaign Goal
          </label>
          <div className="grid grid-cols-2 gap-3">
            {goals.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => handleChange({ target: { name: 'goal', value: g.id } })}
                className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  formData.goal === g.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            <MessageCircle className="w-4 h-4 text-purple-500" /> Campaign Tone
          </label>
          <select
            name="tone"
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none transition-all appearance-none"
            value={formData.tone}
            onChange={handleChange}
          >
            <option value="" disabled>Select a tone</option>
            {tones.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onPrev}
          className="px-6 py-3 rounded-lg font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Campaign
        </button>
      </div>
    </motion.div>
  );
}
