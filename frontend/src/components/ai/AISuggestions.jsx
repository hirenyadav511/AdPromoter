import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const AISuggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-5 shadow-sm mt-4"
    >
      <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-500 mb-3 flex items-center gap-2">
        <Lightbulb className="w-4 h-4" /> Smart Suggestions
      </h4>
      <ul className="space-y-2">
        {suggestions.map((sug, i) => (
          <li key={i} className="text-xs text-yellow-700 dark:text-yellow-400 flex items-start gap-2">
            <span className="mt-0.5">•</span>
            <span>{sug}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AISuggestions;
