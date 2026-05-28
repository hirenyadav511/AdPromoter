import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const getColorClass = (score) => {
  if (score >= 85) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

const ScoreBar = ({ label, score }) => {
  const colorClass = getColorClass(score);
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</span>
        <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{score}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${colorClass}`}
        />
      </div>
    </div>
  );
};

const AIScoreCard = ({ scores }) => {
  if (!scores) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700 rounded-xl p-5 shadow-sm"
    >
      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-indigo-500" /> Quality Scores
      </h4>
      <ScoreBar label="SEO Optimization" score={scores.seo || 0} />
      <ScoreBar label="Engagement Potential" score={scores.engagement || 0} />
      <ScoreBar label="Conversion Potential" score={scores.conversion || 0} />
      <ScoreBar label="Ad Quality" score={scores.quality || 0} />
    </motion.div>
  );
};

export default AIScoreCard;
