import { motion } from 'framer-motion';
import { UploadCloud, DollarSign, Calendar } from 'lucide-react';

export default function Step5Settings({ formData, handleChange, file, setFile, onNext, onPrev }) {
  const isValid = formData.budget && formData.duration && file;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Campaign Settings</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Configure budget, duration, and add your creative assets.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
        
        {/* Media Upload */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            <UploadCloud className="w-4 h-4 text-blue-500" /> Upload Creative Asset
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors relative">
            <input
              type="file"
              accept="image/*,video/*"
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Click to upload or drag & drop</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or MP4 (max. 800x400px)</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" /> Daily Budget
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
              <input
                type="number"
                name="budget"
                required
                min="1"
                placeholder="50"
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 pl-8 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none transition-all font-semibold"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 text-orange-500" /> Duration (Days)
            </label>
            <input
              type="number"
              name="duration"
              required
              min="1"
              placeholder="30"
              className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all font-semibold"
              value={formData.duration}
              onChange={handleChange}
            />
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
          disabled={!isValid}
          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Final Review
        </button>
      </div>
    </motion.div>
  );
}
