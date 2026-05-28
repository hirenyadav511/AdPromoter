import { motion } from 'framer-motion';
import { Rocket, Target, FileText, CheckCircle2 } from 'lucide-react';

export default function Step6ReviewLaunch({ formData, aiResults, file, onPrev, onSubmit, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-10 h-10 text-indigo-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to Launch!</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Review your campaign details before going live.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          
          {/* Strategy Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" /> Strategy
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Platform:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formData.platform}</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Audience:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formData.audience}</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Goal:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formData.goal}</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Tone:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formData.tone}</span>
              </li>
            </ul>
          </div>

          {/* Configuration Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" /> Configuration
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Budget:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">${formData.budget} / day</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formData.duration} days</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Total Spend:</span>
                <span className="font-bold text-gray-900 dark:text-white">${formData.budget * formData.duration}</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Creative:</span>
                <span className="font-semibold text-gray-900 dark:text-white truncate max-w-[150px]">{file?.name}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* AI Content Preview */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 relative z-10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> Generated Content Preview
          </h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
            <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-2">{aiResults?.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{aiResults?.description}</p>
            <div className="flex flex-wrap gap-2">
              {aiResults?.hashtags?.map((tag, i) => (
                <span key={i} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onPrev}
          disabled={loading}
          className="px-6 py-3 rounded-lg font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          Go Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-70 flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Launching...
            </>
          ) : (
            <>
              <Rocket className="w-5 h-5" /> Launch Campaign
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
