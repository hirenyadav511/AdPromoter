import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const AIResultCard = ({ title, content, isArray = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = isArray ? content.join(' ') : content;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all relative group"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{title}</h4>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-indigo-500 transition-colors bg-gray-50 dark:bg-gray-800 p-1.5 rounded-md opacity-0 group-hover:opacity-100"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      {isArray ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {content.map((item, i) => (
            <span key={i} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm rounded-md font-medium">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      )}
    </motion.div>
  );
};

export default AIResultCard;
