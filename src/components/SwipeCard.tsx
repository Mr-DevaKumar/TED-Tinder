import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X, Clock, Eye, ExternalLink } from 'lucide-react';
import { TedTalk } from '../types';

interface SwipeCardProps {
  talk: TedTalk;
  onSwipeLeft: (talk: TedTalk) => void;
  onSwipeRight: (talk: TedTalk) => void;
  isTop: boolean;
  index: number;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ 
  talk, 
  onSwipeLeft, 
  onSwipeRight, 
  isTop, 
  index 
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-30, 30]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (offset > 100 || velocity > 500) {
      onSwipeRight(talk);
    } else if (offset < -100 || velocity < -500) {
      onSwipeLeft(talk);
    }
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      onSwipeLeft(talk);
    } else {
      onSwipeRight(talk);
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ 
        x, 
        rotate, 
        opacity,
        zIndex: isTop ? 10 : 10 - index,
      }}
      animate={{ 
        scale: isTop ? 1 : 1 - (index * 0.05),
        y: index * 10,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
    >
      <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border dark:border-gray-700">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={talk.thumbnail}
            alt={talk.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Topic Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 dark:text-gray-100">
              {talk.topic}
            </span>
          </div>
          
          {/* Stats */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{talk.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{talk.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
            {talk.title}
          </h2>
          
          <p className="text-red-600 dark:text-red-400 font-semibold mb-3">
            {talk.speaker}
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 line-clamp-3 mb-4">
            {talk.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {talk.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonSwipe('left')}
              className="w-14 h-14 bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 transition-colors"
              disabled={!isTop}
            >
              <X size={24} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(talk.videoUrl, '_blank')}
              className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors"
              disabled={!isTop}
            >
              <ExternalLink size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonSwipe('right')}
              className="w-14 h-14 bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full flex items-center justify-center text-green-500 transition-colors"
              disabled={!isTop}
            >
              <Heart size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;