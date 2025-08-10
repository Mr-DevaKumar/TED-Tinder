import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ThumbsUp, ThumbsDown, Clock, Eye, ExternalLink, Info } from 'lucide-react';
import { TedTalk } from '../types';

interface TalkCardProps {
  talk: TedTalk;
  onAddToFavorites: (talk: TedTalk) => void;
  onRemoveFromFavorites: (talkId: string) => void;
  isFavorite: boolean;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

const TalkCard: React.FC<TalkCardProps> = ({ 
  talk, 
  onAddToFavorites, 
  onRemoveFromFavorites, 
  isFavorite,
  size = 'medium',
  showDetails = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);

  const sizeClasses = {
    small: 'w-48 h-28',
    medium: 'w-64 h-36',
    large: 'w-80 h-44'
  };

  const handleLike = () => {
    if (isFavorite) {
      onRemoveFromFavorites(talk.id);
    } else {
      onAddToFavorites(talk);
    }
  };

  return (
    <>
      <motion.div
        className={`relative ${sizeClasses[size]} flex-shrink-0 cursor-pointer group`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, zIndex: 10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Card */}
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-900">
          <img
            src={talk.thumbnail}
            alt={talk.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Topic Badge */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
              {talk.topic}
            </span>
          </div>
          
          {/* Duration */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white text-xs">
            <Clock size={12} />
            <span>{talk.duration}</span>
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
              {talk.title}
            </h3>
            <p className="text-gray-300 text-xs">
              {talk.speaker}
            </p>
          </div>
          
          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
              >
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(talk.videoUrl, '_blank')}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                  >
                    <Play size={16} fill="currentColor" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isFavorite 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : 'border-white text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {isFavorite ? <ThumbsUp size={16} fill="currentColor" /> : <Plus size={16} />}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFullDetails(true)}
                    className="w-10 h-10 border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <Info size={16} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Full Details Modal */}
      <AnimatePresence>
        {showFullDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFullDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Hero Image */}
              <div className="relative h-64">
                <img
                  src={talk.thumbnail}
                  alt={talk.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setShowFullDetails(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
                
                {/* Play Button */}
                <div className="absolute bottom-6 left-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(talk.videoUrl, '_blank')}
                    className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Play size={20} fill="currentColor" />
                    Watch Now
                  </motion.button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{talk.title}</h2>
                    <p className="text-red-400 font-semibold mb-2">{talk.speaker}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{talk.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{talk.views}</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        {talk.topic}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLike}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isFavorite 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsUp size={16} fill={isFavorite ? "currentColor" : "none"} />
                    </motion.button>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{talk.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {talk.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TalkCard;