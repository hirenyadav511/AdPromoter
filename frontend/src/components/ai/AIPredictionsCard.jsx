import { motion } from 'framer-motion';
import { Target, Users, DollarSign, Calendar, Compass } from 'lucide-react';

const PredictionItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl shadow-sm">
    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">{value}</p>
    </div>
  </div>
);

const AIPredictionsCard = ({ predictions }) => {
  if (!predictions) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700 rounded-xl p-5 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" /> AI Predictions
        </h4>
        <div className="px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 rounded text-xs font-bold flex items-center gap-1">
          {predictions.confidence || 90}% Confidence
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <PredictionItem icon={Users} label="Predicted Reach" value={predictions.reach || 'N/A'} />
        <PredictionItem icon={DollarSign} label="Rec. Budget" value={predictions.budget || 'N/A'} />
        <PredictionItem icon={Calendar} label="Rec. Duration" value={predictions.duration || 'N/A'} />
        <PredictionItem icon={Compass} label="Best Platform" value={predictions.platform || 'N/A'} />
      </div>
    </motion.div>
  );
};

export default AIPredictionsCard;
