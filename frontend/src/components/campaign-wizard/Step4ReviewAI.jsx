import { motion } from 'framer-motion';
import AIResultCard from '../ai/AIResultCard';
import AIScoreCard from '../ai/AIScoreCard';
import AISuggestions from '../ai/AISuggestions';
import { Sparkles, Edit2 } from 'lucide-react';

export default function Step4ReviewAI({ aiResults, onNext, onPrev, handleAIGenerate }) {
  if (!aiResults) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-indigo-500" /> AI Content Studio
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Review your highly optimized campaign assets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <AIResultCard title="Campaign Title" content={aiResults.title} />
          <AIResultCard title="Ad Description" content={aiResults.description} />
          <AIResultCard title="Call To Action" content={aiResults.cta} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AIResultCard title="Hashtags" content={aiResults.hashtags} isArray={true} />
            <AIResultCard title="SEO Keywords" content={aiResults.seoKeywords} isArray={true} />
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-4">
          <AIScoreCard scores={aiResults.scores} />
          <AISuggestions suggestions={aiResults.suggestions} />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mt-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Not quite right?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You can adjust the parameters and regenerate the content.</p>
            <button
              onClick={handleAIGenerate}
              className="w-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 py-2.5 rounded-lg font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Edit2 className="w-4 h-4" /> Regenerate Content
            </button>
          </div>
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
          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Approve & Continue
        </button>
      </div>
    </motion.div>
  );
}
