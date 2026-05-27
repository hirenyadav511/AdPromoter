import { motion } from 'framer-motion';

const AILoader = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 max-w-2xl shadow-sm mb-8 w-full">
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30"
        >
          <div className="w-4 h-4 rounded-full bg-indigo-500 animate-pulse"></div>
        </motion.div>
        <div>
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse">
            Gemini is writing...
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing audience and platform trends.</p>
        </div>
      </div>

      <div className="space-y-4">
        <motion.div 
          className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
        />
        <motion.div 
          className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-full"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
        />
        <motion.div 
          className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-5/6"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
        />
        <motion.div 
          className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-4/6"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
        />
      </div>
    </div>
  );
};

export default AILoader;
