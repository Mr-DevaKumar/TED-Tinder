import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Clock, Eye } from 'lucide-react';
import { TedTalk } from '../types';

interface RecommendationsProps {
  recommendations: TedTalk[];
  message: string;
  onClose: () => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ 
  recommendations, 
  message, 
  onClose 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={24} />
            <h2 className="text-xl font-bold">TalkMatch AI</h2>
          </div>
          <p className="text-purple-100">{message}</p>
        </div>

        {/* Recommendations */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {recommendations.map((talk, index) => (
            <motion.div
              key={talk.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={talk.thumbnail}
                  alt={talk.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 mb-1">
                  {talk.title}
                </h3>
                <p className="text-red-600 dark:text-red-400 text-xs font-medium mb-2">
                  {talk.speaker}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span>{talk.duration}</span>
                    </div>
                    <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">
                      {talk.topic}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(talk.videoUrl, '_blank')}
                    className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    <ExternalLink size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold"
          >
            Continue Swiping
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Recommendations;