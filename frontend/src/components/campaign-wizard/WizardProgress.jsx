import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, name: 'Platform' },
  { id: 2, name: 'Details' },
  { id: 3, name: 'AI Generation' },
  { id: 4, name: 'Review Content' },
  { id: 5, name: 'Settings' },
  { id: 6, name: 'Launch' },
];

export default function WizardProgress({ currentStep }) {
  return (
    <div className="w-full mb-8 overflow-x-auto pb-4 custom-scrollbar">
      <div className="min-w-[600px] flex items-center justify-between relative px-2">
        {/* Background Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0"></div>
        
        {/* Active Line Progress */}
        <motion.div 
          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 rounded-full z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${Math.max(0, (currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isActive ? '#6366f1' : '#f3f4f6',
                  borderColor: isCompleted || isActive ? '#6366f1' : '#e5e7eb',
                  color: isCompleted || isActive ? '#ffffff' : '#9ca3af',
                  scale: isActive ? 1.1 : 1,
                }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700 ${
                  isActive ? 'ring-4 ring-indigo-500/20' : ''
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.id}
              </motion.div>
              <div className="mt-2 text-xs font-semibold text-center whitespace-nowrap">
                <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : isCompleted ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}>
                  {step.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
