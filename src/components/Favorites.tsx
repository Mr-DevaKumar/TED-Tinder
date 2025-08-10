import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ExternalLink, Clock, Eye } from 'lucide-react';
import { TedTalk } from '../types';

interface FavoritesProps {
  favorites: TedTalk[];
  onRemoveFavorite: (talkId: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="mx-auto mb-4 text-gray-400" size={48} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No favorites yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Swipe right on talks you love to add them here!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Your Favorite Talks ({favorites.length})
      </h2>
      
      <div className="grid gap-4">
        {favorites.map((talk, index) => (
          <motion.div
            key={talk.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border dark:border-gray-700"
          >
            <div className="flex">
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={talk.thumbnail}
                  alt={talk.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                    {talk.title}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onRemoveFavorite(talk.id)}
                    className="ml-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Heart size={18} fill="currentColor" />
                  </motion.button>
                </div>
                
                <p className="text-red-600 dark:text-red-400 text-sm font-medium mb-2">
                  {talk.speaker}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{talk.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    <span>{talk.views}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    {talk.topic}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    {talk.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(talk.videoUrl, '_blank')}
                    className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    <ExternalLink size={14} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;