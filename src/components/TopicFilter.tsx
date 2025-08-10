import React from 'react';
import { motion } from 'framer-motion';
import { TOPICS } from '../data/mockTedTalks';

interface TopicFilterProps {
  selectedTopics: string[];
  onTopicToggle: (topic: string) => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({ selectedTopics, onTopicToggle }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Filter by Topics
      </h3>
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <motion.button
              key={topic}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTopicToggle(topic)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {topic}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicFilter;