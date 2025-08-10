import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Info, Volume2, VolumeX } from 'lucide-react';
import { TedTalk } from '../types';

interface HeroSectionProps {
  featuredTalk: TedTalk;
  onAddToFavorites: (talk: TedTalk) => void;
  onRemoveFromFavorites: (talkId: string) => void;
  isFavorite: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  featuredTalk,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      onRemoveFromFavorites(featuredTalk.id);
    } else {
      onAddToFavorites(featuredTalk);
    }
  };

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredTalk.thumbnail}
          alt={featuredTalk.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-4 md:px-8 max-w-2xl">
          {/* Topic Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded">
              {featuredTalk.topic}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            {featuredTalk.title}
          </motion.h1>

          {/* Speaker */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-red-400 font-semibold mb-4"
          >
            {featuredTalk.speaker}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-300 mb-6 max-w-xl line-clamp-3"
          >
            {featuredTalk.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 text-sm text-gray-400 mb-8"
          >
            <span>{featuredTalk.duration}</span>
            <span>{featuredTalk.views} views</span>
            <span>{new Date(featuredTalk.date).getFullYear()}</span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(featuredTalk.videoUrl, '_blank')}
              className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              <Play size={20} fill="currentColor" />
              Watch Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetails(true)}
              className="flex items-center gap-3 px-8 py-3 bg-gray-600/80 text-white rounded font-semibold hover:bg-gray-600 transition-colors backdrop-blur-sm"
            >
              <Info size={20} />
              More Info
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleFavorite}
              className={`flex items-center gap-3 px-8 py-3 rounded font-semibold transition-colors backdrop-blur-sm ${
                isFavorite
                  ? 'bg-green-600/80 text-white hover:bg-green-600'
                  : 'bg-gray-600/80 text-white hover:bg-gray-600'
              }`}
            >
              <Plus size={20} />
              {isFavorite ? 'Added' : 'My List'}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mute Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="relative h-64">
                <img
                  src={featuredTalk.thumbnail}
                  alt={featuredTalk.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{featuredTalk.title}</h2>
                <p className="text-red-400 font-semibold mb-4">{featuredTalk.speaker}</p>
                <p className="text-gray-300 mb-4">{featuredTalk.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredTalk.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(featuredTalk.videoUrl, '_blank')}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Play size={16} fill="currentColor" />
                    Watch Now
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggleFavorite}
                    className={`flex items-center gap-2 px-6 py-3 rounded font-semibold transition-colors ${
                      isFavorite
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    <Plus size={16} />
                    {isFavorite ? 'Added' : 'Add to List'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;