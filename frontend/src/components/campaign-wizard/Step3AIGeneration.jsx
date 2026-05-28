import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AILoader from '../ai/AILoader';
import { Sparkles } from 'lucide-react';

export default function Step3AIGeneration({ aiLoading, aiResults, handleAIGenerate, onNext, onPrev }) {
  // Trigger AI generation on mount if no results exist
  useEffect(() => {
    if (!aiResults && !aiLoading) {
      handleAIGenerate();
    }
  }, []);

  // Auto-advance when results are ready
  useEffect(() => {
    if (aiResults && !aiLoading) {
      const timer = setTimeout(() => {
        onNext();
      }, 1500); // give a moment to see success state
      return () => clearTimeout(timer);
    }
  }, [aiResults, aiLoading, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-3xl mx-auto min-h-[400px] flex flex-col items-center justify-center py-12"
    >
      {aiLoading ? (
        <AILoader />
      ) : aiResults ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Magic Complete!</h2>
          <p className="text-gray-500 dark:text-gray-400">Your campaign has been generated.</p>
        </motion.div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-gray-500">Preparing to generate...</p>
        </div>
      )}

      {/* Show back button only if there's an error (not loading, no results) */}
      {!aiLoading && !aiResults && (
        <button
          onClick={onPrev}
          className="mt-8 px-6 py-3 rounded-lg font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Go Back
        </button>
      )}
    </motion.div>
  );
}
